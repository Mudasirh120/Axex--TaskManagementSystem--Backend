import e from "express";
import { userLogin, userRegister } from "../controllers/usersController.js";
const adminsRouter = e.Router();
adminsRouter.post("/login", userLogin);
adminsRouter.post("/register", userRegister);
export default adminsRouter;
