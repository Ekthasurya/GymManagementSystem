import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },

    method: {
      type: String,
      enum: ["qr", "manual"],
      default: "qr",
    },
  },
  {
    timestamps: true,
  }
);

// One attendance record per member per day
attendanceSchema.index(
  { member: 1, date: 1 },
  { unique: true }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;