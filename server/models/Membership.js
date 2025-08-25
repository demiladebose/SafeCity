import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "member", "responder"],
      default: "member",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Membership", membershipSchema);
