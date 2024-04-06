import express from "express";
import {
  getAllUsers,
  register,
  getUserProfile,
  login,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

// register user
router.post("/new", register);

//login user
router.post("/login", login);

// get user details by id
router.get("/me", isAuthenticated, getUserProfile);

router.get("/logout", logout);

export default router;
