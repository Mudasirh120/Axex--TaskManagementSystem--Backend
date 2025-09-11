import validator from "validator";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { clearCookie, createToken, setCookies } from "../utils/jwt.js";
import { returnUser } from "../utils/UserSelector.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { sendMail } from "../utils/Brevo.js";
import Assistant from "../models/assistantModel.js";
export const userLogin = async (req, res) => {
  const { email, password, role } = req.body;
  const User = returnUser(role);
  await loginLogic(User, role, res, email, password);
};
export const userRegister = async (req, res) => {
  const {
    email,
    name,
    password,
    role,
    address,
    city,
    state,
    country,
    assistantEmail,
  } = req.body;
  const file = req.file;
  const User = returnUser(role);
  await registerLogic(
    User,
    res,
    email,
    name,
    password,
    file,
    address,
    city,
    state,
    country,
    role,
    assistantEmail
  );
};
export const userLogout = (req, res) => {
  clearCookie(res);
  return res
    .status(200)
    .json({ success: true, message: "User Logged out successfully" });
};
export const getAllUsers = async (req, res) => {
  const { role } = req.params;
  const User = returnUser(role);
  await fetchUsers(User, res);
};
export const getOneUser = async (req, res) => {
  const { role, id } = req.params;
  const User = returnUser(role);
  await fetchAUser(User, res, id);
};
const registerLogic = async (
  User,
  res,
  email,
  name,
  password,
  file,
  address,
  city,
  state,
  country,
  role,
  assistantEmail
) => {
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
    let url = undefined;
    if (file) {
      url = await cloudinaryUpload(file.path, "clients");
    }
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    if (role === "client") {
      if (assistantEmail) {
        const assistant = await Assistant.findOne({ email: assistantEmail });
        if (assistant) {
          newUser.assistant = assistant._id;
        }
      }
      newUser.picture = url || "";
      newUser.address = address;
      newUser.city = city;
      newUser.state = state;
      newUser.country = country;
    }
    const result = await newUser.save();
    if (result) {
      // await sendMail(newUser.email, newUser.name);
    }
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const loginLogic = async (User, role, res, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists." });
    }
    const isMatched = await comparePassword(password, existingUser.password);
    if (isMatched) {
      const token = createToken(`${existingUser.id}${role}`);
      setCookies(res, token);
      // await sendMail(email, existingUser.name);
      return res
        .status(200)
        .json({ success: true, message: "User Logged In Successfully", role });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const fetchUsers = async (User, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res
        .status(404)
        .json({ success: false, message: "No Users found." });
    }
    return res.status(200).json({
      success: true,
      message: `Users fetched successfully`,
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const fetchAUser = async (User, res, _id) => {
  try {
    const foundUser = await User.findOne({ _id });
    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "No User found." });
    }
    return res.status(200).json({
      success: true,
      message: `User fetched successfully`,
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
