import { verifyToken } from "../utils/jwt.js";
export const authClient = (req, res) => {
  authUser(req, res);
};
export const authAssistant = (req, res) => {
  authUser(req, res);
};
export const authAdmin = (req, res) => {
  authUser(req, res);
};
export const authUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ success: false, message: "Not Authorized" });
    const decoded = verifyToken(token);
    const id = originalString.substring(0, 23);
    const role = originalString.substring(23);
    const User = returnUser(role);
    const userExists = await User.findById(id);
    if (userExists) {
      return res.status(200).json({ success: true, message: "Authorized" });
    } else {
      return res.json({ success: false, message: "Fake token" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
