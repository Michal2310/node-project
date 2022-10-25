import { initializeStorage } from "./src/utils/gridFS.js";
import { connect } from "./src/utils/database.js";
import dotenv from "dotenv/config";

const { MONGO_URI } = process.env;

connect(MONGO_URI);
initializeStorage(MONGO_URI);
