import e from "express";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import validator from "validator";
import { createToken, setCookies } from "../utils/jwt.js";
const authRouter = e.Router();
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists." });
    }
    const isMatched = await comparePassword(password, existingUser.password);
    if (isMatched) {
      const token = createToken(existingUser.id);
      setCookies(res, token);
      return res
        .status(200)
        .json({ success: true, message: "User Logged In Successfully" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ success: false, message: "User already exists." });
    }
    if (!validator.isEmail(email))
      return res
        .status(422)
        .json({ success: false, message: "Please enter a valid email" });
    if (password.length < 8)
      return res
        .status(422)
        .json({ success: false, message: "Please enter a strong password" });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default authRouter;
