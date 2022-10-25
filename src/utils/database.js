import mongoose from "mongoose";

export const connect = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
  } catch (error) {
    console.log(error);
  }
};
