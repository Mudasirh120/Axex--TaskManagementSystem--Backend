import e from "express";
import {
  getAllUsers,
  userLogin,
  userRegister,
  getOneUser,
} from "../controllers/usersController.js";
import { upload } from "../middleware/multer.js";
const userRouter = e.Router();
userRouter.post("/login", userLogin);
userRouter.post("/register", upload.single("pfp"), userRegister);
userRouter.get("/getAllUsers/:role", getAllUsers);
userRouter.get("/getOne/:role/:id", getOneUser);
export default userRouter;
