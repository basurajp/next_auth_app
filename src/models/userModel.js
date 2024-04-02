import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

    varifyToken: String,
    varifyExpiry: Date,
  },

  { timestamps: true }
);


const User = mongoose.models.userSchema ||  mongoose.model("User", userSchema);

export default User;
