import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/create-account", registerUser);
router.post("/login", loginUser);

export default router;
