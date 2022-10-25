import express from "express";
import {
  getOne,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import ensureAuthenticated from "../middlewares/isAuth.js";
const user = express.Router();

user.get("/:id", getOne);
user.patch("/:id", ensureAuthenticated, updateUser);
user.delete("/:id", ensureAuthenticated, deleteUser);

export default user;
