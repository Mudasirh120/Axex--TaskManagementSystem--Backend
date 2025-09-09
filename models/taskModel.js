import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    assistant: { type: mongoose.Schema.Types.ObjectId, ref: "Assistant" },
    firstResponse: { type: Date },
    finalClosing: { type: Date },
    isAdminApproved: { type: Boolean },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
