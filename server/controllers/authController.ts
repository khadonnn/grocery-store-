//register
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET! as string, {
    expiresIn: "30d",
  });
};
// check if user is admin
const getAdminStatus = async (
  email: string | undefined | null,
): Promise<boolean> => {
  if (!email) return false;
  const adminEmail = process.env.ADMIN_EMAIL
    ? process.env.ADMIN_EMAIL.split(",").map((e) => e.trim().toLowerCase())
    : [];
  return adminEmail.includes(email.toLowerCase());
};
// post /api/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const handledPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), password: handledPassword },
  });
  const token = generateToken(user.id);

  const userData: any = { ...user };
  delete userData.password;
  userData.isAdmin = await getAdminStatus(user.email);
  res.status(201).json({ user: userData, token });
};
//login
// post /api/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase(), include: { addresses: true } },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user.id);

  const userData: any = { ...user };
  delete userData.password;
  userData.isAdmin = await getAdminStatus(user.email);
  res.status(200).json({ user: userData, token });
};
