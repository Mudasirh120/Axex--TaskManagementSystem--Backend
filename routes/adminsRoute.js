import e from "express";
import { userLogin } from "../controllers/usersController.js";
const adminRouter = e.Router();
usersRouter.post("/login", userLogin);
export default adminRouter;
