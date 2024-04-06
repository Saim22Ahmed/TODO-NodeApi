import express from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  DeleteTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTask);

router.get("/all", isAuthenticated, getAllTasks);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, DeleteTask);

export default router;
