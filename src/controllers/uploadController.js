import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from "dotenv/config";

let db;
let gridBucket;
let gfs;

mongoose.connection.on("connected", () => {
  db = mongoose.connections[0].db;
  gridBucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads",
  });
  console.log("DB connection established 🚀");
  gfs = Grid(db, mongoose.mongo);
  gfs.collection("uploads");
});

export const uploadFile = (req, res) => {
  try {
    res.json({ file: req.file });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    if (files) {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      //res.render("index", { files: files });
      res.json({
        status: "success",
        data: files,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPhotoUrl = async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      filename: req.params.filename,
    });
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readstream = gridBucket.openDownloadStreamByName(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
