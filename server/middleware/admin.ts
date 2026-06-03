import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } } as any);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((email) =>
          email.trim().toLowerCase(),
        )
      : [];
    if (!adminEmails.includes(user.email.toLowerCase())) {
      if (req.user) req.user.isAdmin = true;
      next();
    } else {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
  } catch (error) {
    console.log("Admin middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default admin;
