import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

interface AuthRequest extends Request {
  user?: { id: number };
}

interface AuthRequest extends Request {
  user?: { id: number };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Access denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined in .env");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const verified = jwt.verify(token, secret) as unknown as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: verified.id },
      select: { status: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ error: "User is blocked" });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
