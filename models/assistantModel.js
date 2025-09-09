import mongoose from "mongoose";
const assistantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  pendingTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  totalNumberOfTasks: { type: Number },
  totalnumberOfCompletedTasks: { type: Number },
});
const Assistant = mongoose.model("Assistant", assistantSchema);
export default Assistant;
