import { User } from "../../Models/Users/UserSchema.js";
import bcrypt, { compare } from "bcrypt";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { sendOtp } from "../../extra/sendOpt.js";

export const registerUser = async (req, res) => {
  const { f_name, l_name, email, password, role } = req.body;

  if (!f_name || !l_name || !email || !password || !role) {
    res.status(404);
    throw new Error("Feildes Required ");
  }

  const checkMail = await User.findOne({ email });
  if (checkMail) {
    res.status(400);
    throw new Error("Email already present 😎");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // let otp = otpGenerator.generate(6, {
  //   digits: true,
  //   upperCaseAlphabets: false,
  //   lowerCaseAlphabets: false,
  //   specialChars: false,
  // });

  const newUser = await User.create({
    f_name,
    l_name,
    email,
    password: hashPassword,
    role,
    // otp,
  });

  // sendOtp({ email, otp });

  setTimeout(async () => {
    let user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400);
      throw new Error("invlied otp");
    }
    user.otp = null;
    await user.save();
  }, 600000);
  res.send(newUser);
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404);
      throw new Error("Enter the fields");
    }

    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
      res.status(400);
      throw new Error("invalid Email");
    }

    let comparePassword = await bcrypt.compare(password, checkEmail?.password);
    if (!comparePassword) {
      res.status(400);
      throw new Error("invalid password ");
    }

    res.send({
      _id: checkEmail?._id,
      email: checkEmail?.email,
      role: checkEmail?.role,
      password: checkEmail?.password,
    });
  } catch (error) {
    console.log(error);
  }
};

//  ===== get all User ======

export const getAllUser = async (req, res) => {
  const { role } = req.body;

  if (role !== "admin") {
    res.status(400).json("Only Admin Can Get User");
  }
  let newUser = await User.find();
  res.send(newUser);
};

// ====   get one useer==

export const singleUser = async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found ");
  }

  res.send(user);
};

//  ===  update Users =====

export const updateUser = async (req, res) => {
  let { user_id } = req.params;
  const { role, l_name, f_name } = req.body;

  if (role !== "admin") {
    res.status(400).json("Only Admin Can Update");
  }
  if (!user_id) {
    res.status(404);
    throw new Error("Invalid ID");
  }

  let matchId = await User.findById(user_id);

  const updateNewUser = await User.findByIdAndUpdate(
    user_id,
    {
      f_name,
      l_name,
    },
    {
      new: true,
    },
  );

  res.send(updateNewUser);
};

//   delate user ====

export const deleteUser = async (req, res) => {
  let { user_id } = req.params;

  const { role } = req.body;
  if (role !== "admin") {
    res.status(400).json("Only Admin Can Dalate ");
  }
  if (!user_id) {
    res.status(404);
    throw new Error("Invalid ID");
  }

  let deleteNewUser = await User.findByIdAndDelete(user_id);
  res.send(deleteNewUser);
};
