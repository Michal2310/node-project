import User from "../models/User.js";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false);
      }
      await bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, null);
    }
  } catch (error) {
    console.log(error);
  }
});

export default passport;
