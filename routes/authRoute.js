import e from "express";
import { authUser } from "../controllers/authController.js";
const authRouter = e.Router();
authRouter.post("/", authUser);
export default authRouter;
