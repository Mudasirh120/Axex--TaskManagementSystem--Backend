import e from "express";
import { userLogin } from "../controllers/usersController.js";
const adminsRouter = e.Router();
adminsRouter.post("/login", userLogin);
export default adminsRouter;
