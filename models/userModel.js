import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  currentTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});
const User = mongoose.model("User", userSchema);
export default User;
