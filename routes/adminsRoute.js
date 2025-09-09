import e from "express";
import {
  userLogin,
  userRegister,
  userLogout,
} from "../controllers/usersController.js";
const adminsRouter = e.Router();
adminsRouter.post("/login", userLogin);
adminsRouter.post("/register", userRegister);
adminsRouter.post("/logout", userLogout);
export default adminsRouter;
