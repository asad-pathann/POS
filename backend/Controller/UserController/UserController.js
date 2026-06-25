import { User } from "../../Models/Users/UserSchema.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { sendOtp } from "../../extra/sendOpt.js";

// ===== Register User =====
export const registerUser = async (req, res) => {
  try {
    const { f_name, l_name, email, password, role } = req.body;

    if (!f_name || !l_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkMail = await User.findOne({ email });
    if (checkMail) {
      return res.status(400).json({ message: "Email already present 😎" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // OTP Generate karna zaroori hai kyunki niche use ho raha hai
    let otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const newUser = await User.create({
      f_name,
      l_name,
      email,
      password: hashPassword,
      role,
      otp,
    });

    // OTP Email send karein
    sendOtp({ email, otp });

    // 10 mints (600000 ms) baad OTP ko expire (null) karne ke liye
    setTimeout(async () => {
      try {
        await User.findOneAndUpdate({ email }, { otp: null });
        console.log(`OTP expired for ${email}`);
      } catch (err) {
        console.error("Error expiring OTP:", err);
      }
    }, 600000);

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== Login User =====
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all fields" });
    }

    let checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    let comparePassword = await bcrypt.compare(password, checkEmail.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Password response mein send nahi karna chahiye safety ke liye
    res.send({
      _id: checkEmail._id,
      email: checkEmail.email,
      role: checkEmail.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== Get All Users =====
export const getAllUser = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== Get Single User =====
export const singleUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== Update User =====
export const updateUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    const { role, l_name, f_name } = req.body;

    if (role !== "admin") {
      return res.status(403).json({ message: "Only Admin Can Update" });
    }
    if (!user_id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updateNewUser = await User.findByIdAndUpdate(
      user_id,
      { f_name, l_name },
      { new: true },
    );

    res.send(updateNewUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== Delete User =====
export const deleteUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    const { role } = req.body;

    if (role !== "admin") {
      return res.status(403).json({ message: "Only Admin Can Delete" });
    }
    if (!user_id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let deleteNewUser = await User.findByIdAndDelete(user_id);
    res.send(deleteNewUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
