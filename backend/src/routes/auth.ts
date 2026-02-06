import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status: "unverified",
        lastLogin: null,
      },
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (error: any) {
    console.error("REGISTRATION ERROR:", error);

    // INFO: Catches unique email error
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ error: "User is blocked" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/verify", authMiddleware, async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { status: "active" },
    });
    res.json({ message: "Verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
});

export default router;
