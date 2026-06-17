// create order
// Post /api/orders

import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { inngest } from "../inngest/index.js";
import Stripe from "stripe";
export const createOrder = async (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  // check if items is empty
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the order" });
  }
  // look up actual prices from database and calculate total

  const productIds = items.map((item: any) => item.product);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productMap: Record<string, (typeof products)[0]> = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });
  //   check if product is in stock
  for (const item of items) {
    const product = productMap[item.product];
    if (!product || (product.stock ?? 0) < item.quantity) {
      return res
        .status(400)
        .json({ message: `Product ${item.product} is not in stock` });
    }
  }
  const orderItems = items.map((item: any) => {
    const dbProduct = productMap[item.product];
    if (!dbProduct)
      throw new Error(`Product ${item.product} not found in database`);
    return {
      product: dbProduct.id,
      name: dbProduct.name,
      image: dbProduct.image,
      price: dbProduct.price,
      quantity: item.quantity,
      unit: dbProduct.unit,
    };
  });
  const subtotal = orderItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 2 ? 0 : 1.99; // free delivery for orders above $20
  const tax = Math.round(subtotal * 0.08 * 100) / 100; //
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;
  const order = await prisma.order.create({
    data: {
      userId: req.user!.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      statusHistory: [
        {
          status: "Placed",
          note: "Order placed Successfully",
          timestamp: new Date(),
        },
      ],
    },
  });
  if (paymentMethod === "card") {
    // stripe payment link

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const session = await stripe.checkout.sessions.create({
      success_url: `${req.headers.origin}/orders?clearCart=true`,
      cancel_url: `${req.headers.origin}/checkout`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Payment Groceries ${order.id}`,
            },
            unit_amount: Math.round(total * 100), // Replace with actual price
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { orderId: order.id },
    });
    return res.json({ url: session.url });
  }
  res.json({ order });
  //   decrease stock
  for (const item of orderItems) {
    await prisma.product.update({
      where: { id: item.product },
      data: { stock: { decrement: item.quantity } },
    });
  }
  // send stock update event to inngest
  for (const item of orderItems) {
    await inngest.send({
      name: "inventory/stock.updated",
      data: {
        productId: item.product,
      },
    });
  }
  await inngest.send({ name: "order/created", data: { orderId: order.id } });
};

// get user orders
// Get /api/orders

export const getUserOrders = async (req: Request, res: Response) => {
  const { status } = req.query;
  const where: any = {
    userId: req.user!.id,
    NOT: [{ paymentMethod: "card", isPaid: false }],
  };
  if (status && status !== "all") {
    where.status = status;
  }
  const orders = await prisma.order.findMany({
    where,
    include: { deliveryPartner: { select: { name: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ orders });
};
// get single order
// Get /api/orders/:id
export const getorder = async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id as string, userId: req.user!.id },
    include: { deliveryPartner: { select: { name: true, phone: true } } },
  });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json({ order });
};
// update order status (for admin)
// Put /api/orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status, note } = req.body;
  const order = await prisma.order.findUnique({
    where: { id: req.params.id as string },
  });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  const history = (
    Array.isArray(order.statusHistory) ? order.statusHistory : []
  ) as any[];
  history.push({
    status,
    note: note || `Order ${status.toLowerCase()}`,
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: { id: req.params.id as string },
    data: { status, statusHistory: history },
  });
  res.json({ order: updatedOrder });
};
// get all orders (for admin)
// Get /api/orders/all
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
    include: {
      user: { select: { name: true, email: true } },
      deliveryPartner: { select: { name: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ orders });
};
// get order location
// Get /api/orders/:id/location
export const getOrderLocation = async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id as string, userId: req.user!.id },
    select: { liveLocation: true, status: true },
  });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ liveLocation: order.liveLocation, status: order.status });
};
