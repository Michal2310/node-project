import { Router } from "express";
import { login, refresh, register } from "../controllers/authController.js";

const auth = Router();

auth.post("/login", login);
auth.post("/refresh", refresh);
auth.post("/register", register);

export default auth;
