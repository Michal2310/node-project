import { Router } from "express";
import ensureAuthenticated from "../middlewares/isAuth.js";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
const post = Router();

post.post("/", createPost);
post.get("/", getAllPosts);
post.get("/:id", getSinglePost);
post.patch("/:id", ensureAuthenticated, updatePost);
post.delete("/:id", ensureAuthenticated, deletePost);

export default post;
