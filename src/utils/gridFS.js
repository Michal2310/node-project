import path from "path";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import bcrypt from "bcrypt";

let upload = null;

export const initializeStorage = (mongo_uri) => {
  const storage = new GridFsStorage({
    url: mongo_uri,
    file: async (req, file) => {
      try {
        const hashedFilename = await bcrypt.hash(file.originalname, 10);
        const filename = hashedFilename + path.extname(file.originalname);
        return {
          filename,
          bucketName: "uploads",
        };
      } catch (error) {
        console.log(error);
      }
    },
  });
  upload = multer({ storage });
};

export const uploadFileMiddleware = () => {
  return upload.single("file");
};
