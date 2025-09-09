import e from "express";
import { userLogin, userRegister } from "../controllers/usersController.js";
const clientRouter = e.Router();
clientRouter.post("/login", userLogin);
clientRouter.post("/register", userRegister);
export default clientRouter;
