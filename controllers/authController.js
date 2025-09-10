import { verifyToken } from "../utils/jwt.js";
import { returnUser } from "../utils/UserSelector.js";
export const authUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ success: false, message: "Not Authorized" });
    const decoded = verifyToken(token);
    const id = decoded.substring(0, 24);
    const role = decoded.substring(24);
    const User = returnUser(role);
    const userExists = await User.findById(id);
    if (userExists) {
      return res
        .status(200)
        .json({ success: true, message: "Authorized", role });
    } else {
      return res.json({ success: false, message: "Fake token" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
