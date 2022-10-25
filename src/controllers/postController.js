import { isValidObjectId } from "mongoose";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let query = Post.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * pageSize;
    const total = await Post.estimatedDocumentCount();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePost = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).json({
      status: "failed",
    });
    return;
  }
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    console.log("!post", !post);
    if (!post) {
      res.status(404).json({
        status: "failed",
      });
      return;
    }
    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!post) {
      return res.status(404);
    }
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
