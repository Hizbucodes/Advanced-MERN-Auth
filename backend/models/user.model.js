import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Please Provide a password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your passsword"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same",
      },
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPassword: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
