import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  return res.json("Server is Up!");
});

export default router;