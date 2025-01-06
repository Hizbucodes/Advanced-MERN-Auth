import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  try {
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({
        status: "false",
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "false",
        message: "Password and ConfirmPassword Must be same",
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        status: "false",
        message: "User is already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      status: "true",
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "false",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  res.send("");
};

export const logout = async (req, res) => {
  res.send("");
};
