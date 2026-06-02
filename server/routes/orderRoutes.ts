import express from "express";
import auth from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  getorder,
  getOrderLocation,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/corderController";
import admin from "../middleware/admin";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getUserOrders);
orderRouter.get("/all", auth, admin, getAllOrders);
orderRouter.get("/:id", auth, getorder);
orderRouter.get("/:id/status", auth, admin, updateOrderStatus);
orderRouter.get("/:id/location", auth, getOrderLocation);

export default orderRouter;
