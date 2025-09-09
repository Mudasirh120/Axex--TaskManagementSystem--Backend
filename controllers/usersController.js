import validator from "validator";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createToken, setCookies } from "../utils/jwt.js";
import { returnUser } from "../utils/UserSelector.js";
export const userLogin = async (req, res) => {
  const { email, password, role } = req.body;
  const User = returnUser(role);
  await loginLogic(User, role, res);
};
export const userRegister = async (req, res) => {
  const { email, name, password, role } = req.body;
  const User = returnUser(role);
  await registerLogic(User, role, res, email, name, password);
};
const registerLogic = async (User, role, res, email, name, password) => {
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
};
const loginLogic = async (User, role, res) => {
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
};
