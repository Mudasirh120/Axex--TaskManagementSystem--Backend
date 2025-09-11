import mongoose from "mongoose";
const assistantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/da3ucmjme/image/upload/v1757605073/Vm-logo_jeb9ic.png",
    },
    Clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
    isEmailVerified: { type: Boolean, default: false },
    completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    pendingTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    totalNumberOfTasks: { type: Number },
    totalnumberOfCompletedTasks: { type: Number },
  },
  { timestamps: true }
);
const Assistant = mongoose.model("Assistant", assistantSchema);
export default Assistant;
