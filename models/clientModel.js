import mongoose from "mongoose";
const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assistant: { type: mongoose.Schema.Types.ObjectId, ref: "Assistant" },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    pendingTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    totalNumberOfTasks: { type: Number },
    totalnumberOfCompletedTasks: { type: Number },
  },
  { timestamps: true }
);
const Client = mongoose.model("Client", clientSchema);
export default Client;
