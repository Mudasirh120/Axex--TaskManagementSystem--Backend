import e from "express";
import {
  authAdmin,
  authAssistant,
  authClient,
} from "../controllers/authController.js";
const authRouter = e.Router();
authRouter.post("/client", authClient);
authRouter.post("/admin", authAdmin);
authRouter.post("/assistant", authAssistant);
export default authRouter;
