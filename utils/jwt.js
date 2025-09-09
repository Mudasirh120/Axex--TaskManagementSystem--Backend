import jwt from "jsonwebtoken";
export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET).id;
};
export const setCookies = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};
export const clearCookie = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};
