import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
const deliveryAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // In a real application, you would verify the token and extract the partner info
    // For simplicity, we will just mock this part
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as unknown as {
      id: string;
      role: string;
    };
    if (decoded.role !== "delivery") {
      return res
        .status(403)
        .json({ message: "Access denied. Delivery partners only." });
    }
    const partner = await prisma.deliveryPartner.findUnique({
      where: { id: decoded.id },
    });
    if (!partner || !partner.isActive) {
      return res
        .status(403)
        .json({ message: "Access denied. Inactive or non-existent partner." });
    }
    req.partner = partner;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deliveryAuth;
