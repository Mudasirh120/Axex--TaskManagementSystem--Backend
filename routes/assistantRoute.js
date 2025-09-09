import e from "express";
import { userLogin, userRegister } from "../controllers/usersController.js";
const assistantRouter = e.Router();
assistantRouter.post("/login", userLogin);
assistantRouter.post("/register", userRegister);
export default assistantRouter;
