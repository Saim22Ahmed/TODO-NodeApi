import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return next(new ErrorHandler("Invalid id ! Task not Found", 404));

    task.isCompleted = !task.isCompleted;

    await task.updateOne({
      title: req.body.title,
      description: req.body.description,
    });
    console.log(task.isCompleted);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return next(new ErrorHandler("Invalid id ! Task not Found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
