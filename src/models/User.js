import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Invalid email"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    rooms: {
      type: [Schema.Types.ObjectId],
      ref: "Message",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre("save", async function (next) {
  const password = this.password;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  this.password = newPassword;
  next();
});

const User = model("User", UserSchema);
export default User;
