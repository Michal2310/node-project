import { Router } from "express";
import ensureAuthenticated from "../middlewares/isAuth.js";
import { uploadFileMiddleware } from "../utils/gridFS.js";
import {
  getAllPhotos,
  getPhotoUrl,
  uploadFile,
} from "../controllers/uploadController.js";
const upload = Router();

upload.post("/upload", uploadFileMiddleware(), ensureAuthenticated, uploadFile);

upload.get("/", getAllPhotos);

upload.get("/image/:filename", getPhotoUrl);

export default upload;
