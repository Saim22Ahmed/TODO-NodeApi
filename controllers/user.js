// get all users

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(404).json({
        succes: false,
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // creating user and sending to the login screen using cookies

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User does not exist", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        succes: false,
        message: "Invalid Email or Password",
      });

    sendCookie(user, res, `welcome back , ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = (req, res, next) => {
  try {
    res.status(200).json({
      succes: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      succes: true,
      user: req.user,
    });
};
