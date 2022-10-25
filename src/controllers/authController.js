import User from "../models/User.js";
import passport from "passport";

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(500).json({
        ok: false,
        msg: "user not exists",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({ auth: true, userid: user.id });
      });
    }
  })(req, res, next);
};

export const refresh = (req, res) => {
  try {
    passport.authenticate("local", (err, user, next) => {
      req.fresh;
    });
  } catch (error) {
    console.log(error);
  }
};
export const register = async (req, res) => {
  const user = User.findOne({ email: req.body.email });
  if (user) {
    res.sendStatus(403);
    return;
  }
  const userSaved = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await userSaved.save();
    res.status(201).json({
      ok: true,
      msg: "successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
