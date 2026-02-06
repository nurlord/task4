import express from "express";
import prisma from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { lastLogin: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        lastLogin: true,
        status: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

router.put("/block", async (req, res) => {
  const { userIds } = req.body;
  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: { status: "blocked" },
  });
  res.json({ message: "Users blocked" });
});

router.put("/unblock", async (req, res) => {
  const { userIds } = req.body;
  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: { status: "active" },
  });
  res.json({ message: "Users unblocked" });
});

router.delete("/delete", async (req, res) => {
  const { userIds } = req.body;
  await prisma.user.deleteMany({
    where: { id: { in: userIds } },
  });
  res.json({ message: "Users deleted" });
});

router.delete("/delete-unverified", async (_, res) => {
  try {
    const result = await prisma.user.deleteMany({
      where: {
        status: "unverified",
      },
    });
    res.json({ message: `Deleted ${result.count} unverified users` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete unverified users" });
  }
});

export default router;
