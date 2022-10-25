import express from "express";
import cors from "cors";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "../routers/index.js";
import passport from "../config/passport.js";
import dotenv from "dotenv/config";

const { PORT = 3000, SESSION_SECRET, MONGO_URI } = process.env;

const app = express();

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});

export default app;
