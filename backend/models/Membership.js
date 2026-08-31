import mongoose from "mongoose";


const membershipSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlan",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "active",
        "expired",
        "cancelled",
        "pending",
      ],
      default: "active",
    },

    paymentStatus: {
      type: String,
      enum: [
        "paid",
        "pending",
        "partial",
        "failed",
      ],
      default: "pending",
    },

    autoRenew: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Membership = mongoose.model(
  "Membership",
  membershipSchema
);

export default Membership;