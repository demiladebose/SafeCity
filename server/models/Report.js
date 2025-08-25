import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    imageUrl: String,
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"], // 👈 allowed values
      default: "pending", // 👈 default when report is first created
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
