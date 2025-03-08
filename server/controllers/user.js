import { response } from "express";
import User from "../models/user.module.js";
import { Mailer } from "../utils/Emailer.pipe.js";
import { generatePassword } from "../utils/functions.js";
import { setCookie } from "../utils/generateToken.js";
import { confirmEmail, SendPassword } from "../utils/html.js";

//////!   SIGNUP   !//////

export const Signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, email } = req.body;
    if (password != confirmPassword)
      return res.status(400).json({ error: "Passwords Don't Match" });

    const user = await User.findOne({ email });
    if (user) return res.status(402).json({ error: "Email Already Exist" });

    const newUser = await User.create({
      email,
      username,
      password,
    });

    const { password: sss, __v, ...user1 } = newUser._doc;

    if (user1) {
      Mailer({
        email,
        text: confirmEmail({
          logoURL: "https://i.ibb.co/6RRD03j5/qsdqsd.png",
          supportEmail: "contact@fix-iiit.com",
          username: newUser.username,
          OTP: newUser.OTP,
        }),
      });
      setCookie(user1._id, res);
      return res.status(201).json(user1);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//////!   LOGIN   !//////

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("email");
    if (!user) return res.status(403).json({ error: "Email Not Found" });
    const account = await User.findOne({ email, password }).select(
      "-password -__v"
    );
    if (!account) return res.status(402).json({ error: "Wrong Password" });
    setCookie(account._id, res);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//////!   GOOGLE SIGN   !//////

export const googleSign = async (req, res) => {
  try {
    const { email, given_name, sub } = req.body;
    const userAlready = await User.findOne({ email, googleSub: sub });
    console.log(userAlready);

    if (userAlready) {
      setCookie(userAlready._id, res);
      res.status(202).json(userAlready);
      return;
    }

    const user = await User.create({
      googleProvider: true,
      email,
      username: given_name,
      googleSub: sub,
      isVerified: true,
    });

    if (user) {
      setCookie(user._id, res);
      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//////!   SEND OTP   !//////

export const sendOTP = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { OTP: String(Math.floor(100000 + Math.random() * 900000)) },
      { new: true }
    );
    if (user) {
      Mailer({
        email: user.email,
        text: confirmEmail({
          logoURL: "https://i.ibb.co/6RRD03j5/qsdqsd.png",
          supportEmail: "contact@fix-iiit.com",
          username: user.username,
          OTP: user.OTP,
        }),
      });
      res.status(201).json(`OTP Sent To ${user.email}`);
    }
  } catch (error) {
    return res.status(402).json({ error });
  }
};

//////!   CHECK OTP   !//////

export const checkOTP = async (req, res) => {
  const { OTP } = req.body;
  try {
    const user = await User.findOne({ _id: req.user._id, OTP });
    console.log(req.user._id, OTP);

    if (user) {
      const newUser = await User.findByIdAndUpdate(req.user._id, {
        isVerified: true,
        OTP: String(Math.floor(100000 + Math.random() * 900000)),
      }).select("email isVerified");
      return res.status(201).json(newUser);
    }
    return res.status(402).json({ error: "OTP Expired" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

//////!  RESET PASSWORD  !//////

export const getOneUser = async ({ params }, res) => {
  try {
    const user = await User.findById(params._id).select("-password");
    res.status(202).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

//////!   LOGOUT   !//////

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "");
    res.json("Logge Out Successfuly");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//////!  PROFILE  !//////

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-__v -password -OTP"
    );
    return res.json(user);
  } catch (error) {
    return res.status(401).json({ error });
  }
};

//////!  UPDATE PROFILE  !//////

export const updateProfile = async (req, res) => {
  const { newPassword, oldPassword, username } = req.body;

  try {
    const user = await User.findById(req.user._id).select("-__v");

    if (user) {
      if (oldPassword && newPassword) {
        if (oldPassword !== user.password) {
          return res.status(406).json("Your old password is wrong");
        }
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          password: newPassword,
          username,
          ...req.body,
        },
        { new: true }
      ).select("-password");
      return res.json({ updatedUser });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

//////!  DELETE PROFILE  !//////

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    return res.json(user);
  } catch (error) {
    res.status(406).json({ error });
  }
};

//////!  DELELTE ACCOUNT  !//////

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params._id);
    return res.json({ user });
  } catch (error) {
    res.status(406).json({ error });
  }
};

//////!  GET ALL ACCOUNTS  !//////

export const getAllAccounts = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  let sort = {};
  let args = {};

  if (req.query.sort) sort = { ...sort, [req.query.sort]: -1 };
  if (req.query.search)
    args = {
      ...args,
      $or: [
        { email: { $regex: req.query.search, $options: "i" } },
        { username: { $regex: req.query.search, $options: "i" } },
        { state: { $regex: req.query.search, $options: "i" } },
        { phoneNumber: { $regex: req.query.search } },
      ],
    };

  try {
    const totalCount = await User.countDocuments(args);
    const users = await User.find(args)
      .skip(skip)
      .limit(limit)
      .sort({ [req.query.sort]: -1 });
    return res.json({
      users,
      pages: {
        current: Number(req.query?.page) || 1,
        total: Math.ceil(totalCount / req.query?.limit) || 1,
      },
      total: totalCount,
    });
  } catch (error) {
    res.status(406).json({ error });
  }
};

//////!  UPDATE ACCOUNT  !//////

export const updateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(406).json({ error });
  }
};

//////!  RESET PASSWORD  !//////

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(409).json("Email Not Found");
  if (user.googleProvider)
    return res.status(406).json("Try To Login With Google");

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { password: generatePassword() },
      { new: true }
    );
    Mailer({
      email,
      text: SendPassword({
        logoURL: "https://i.ibb.co/6RRD03j5/qsdqsd.png",
        OTP: user.password,
        supportEmail: "contact@fix-iiit.com",
        username: user.username,
      }),
    });
    res.status(201).json("Password Sent To Your Email");
  } catch (error) {
    res.status(404).json({ error });
  }
};

//////!  CREATE USER   !//////

export const createUser = async ({ body }, res) => {
  try {
    const user = await User.findOne({ email: body?.email });
    if (user) return res.status(402).json({ error: "Email Already Exist" });

    const newUser = await User.create({
      ...body,
      isVerified: true,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(401).json(error);
  }
};
