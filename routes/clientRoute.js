import e from "express";
import { userLogin, userRegister } from "../controllers/usersController.js";
import { upload } from "../middleware/multer.js";
const clientRouter = e.Router();
clientRouter.post("/login", userLogin);
clientRouter.post("/register", upload.single("pfp"), userRegister);
export default clientRouter;
