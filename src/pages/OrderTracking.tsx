import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDashboardOrdersData } from "../assets/assets";
import type { Order } from "../types";
import Loading from "../components/Loading";
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";
import LiveMap from "../components/OrderTracking/LiveMap";
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";

const OrderTracking = () => {
  const currency = import.meta.env.VITE_APP_CURRENCY_SYMBOL || "$";
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id) as any);
    setLoading(false);
  }, [id, navigate]);
  if (loading) return <Loading />;
  if (!order) return null;
  console.log("order:", order);
  return (
    <div className="min-h-screen mb-20 bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <button
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors"
          onClick={() => navigate("/orders")}
        >
          <ArrowLeftIcon className="size-4" /> Back to Orders
        </button>
        {/* orderid, date, status */}
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <h1 className="text-2xl font-semibold text-app-green">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-app-text-light mt-1">
              Placed on{" "}
              {new Date(order!.createdAt).toLocaleDateString("vi-VN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700" : order.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-app-orange/10 text-app-orange"}`}
          >
            {order!.status}
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* left site - timeline + map area */}
          <div className="lg:col-span-2 space-y-6">
            {/* otp card */}
            <OrderOTP order={order} />

            {/* live tracking */}
            <LiveMap order={order} liveLocation={liveLocation} />
            {/* progress timeline */}
            <OrderTimeLine order={order} />
            {/* deliver person */}
            {order?.deliveryPartner &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-app-green flex-center">
                      <span className="text-white font-semibold text-sm">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>
                    <div className="">
                      <p className="text-sm text-app-green font-semibold">
                        {order.deliveryPartner.name}
                      </p>
                      <p className="text-xs text-app-text-light capitalize">
                        {order.deliveryPartner.vehicleType} ● Delivery Partner
                      </p>
                    </div>
                  </div>
                  <a
                    href={`tel:${order.deliveryPartner.phone}`}
                    className="p-2.5 bg-app-cream rounded-xl hover:bg-app-cream-dark transition-colors"
                  >
                    <PhoneIcon className="size-5 text-app-green" />
                  </a>
                </div>
              )}
          </div>

          {/* right site - order details */}
          <div className="space-y-5">
            {/* delivery address */}
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-app-green mb-3 flex items-center gap-2">
                <MapPinIcon className="size-4" />
                Delivery Address
              </h3>
              <p className="text-app-text-light text-sm leading-relaxed">
                {order?.shippingAddress.label}
                <br />
                {order?.shippingAddress.address}
                <br />
                {order?.shippingAddress.city}, {order?.shippingAddress.state}{" "}
                {order?.shippingAddress.zip}
              </p>
            </div>
            {/* items */}
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-app-green mb-3">
                Items ({order?.items.length})
              </h3>
              <div className="space-y-3">
                {order?.items.map((item, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-app-green">
                        {item.name}
                      </p>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-app-green truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-app-text-light">
                          x: {item.quantity} | ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span>
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-app-border space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-app-text-light">Subtotal</span>
                  <span>
                    {currency}
                    {order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Delivery</span>
                  <span>
                    {currency}
                    {order?.deliveryFee === 0
                      ? "Free"
                      : `${currency}${order?.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Tax</span>
                  <span>
                    {currency}
                    {order?.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-app-border font-semibold text-app-green">
                  <span className="">Total</span>
                  <span>
                    {currency}
                    {order?.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderTracking;
