import { isValidObjectId } from "mongoose";
import User from "../models/User.js";

export const getOne = async (req, res) => {
  if (!isValidObjectId) {
    res.sendStatus(404);
    return;
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error getting user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404);
    }
    res.status(200).json({ status: "success", data: post });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404);
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
