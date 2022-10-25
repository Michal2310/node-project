import express from "express";
import user from "./user.js";
import auth from "./auth.js";
import post from "./post.js";
import upload from "./upload.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/post", post);
router.use("/user", user);
router.use("/upload", upload);

export default router;
