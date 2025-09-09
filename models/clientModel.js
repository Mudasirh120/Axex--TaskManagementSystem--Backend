import mongoose from "mongoose";
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  pendingTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  totalNumberOfTasks: { type: Number },
  totalnumberOfCompletedTasks: { type: Number },
});
const Client = mongoose.model("Client", clientSchema);
export default Client;
