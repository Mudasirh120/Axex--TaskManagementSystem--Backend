import e from "express";
import { userLogin, userRegister } from "../controllers/usersController.js";
const usersRouter = e.Router();
usersRouter.post("/login", userLogin);
usersRouter.post("/register", userRegister);
export default usersRouter;
