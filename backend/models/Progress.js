import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      default: null,
    },

    bmi: {
      type: Number,
      default: null,
    },

    bodyFat: {
      type: Number,
      default: null,
    },

    chest: {
      type: Number,
      default: null,
    },

    waist: {
      type: Number,
      default: null,
    },

    hips: {
      type: Number,
      default: null,
    },

    arms: {
      type: Number,
      default: null,
    },

    thighs: {
      type: Number,
      default: null,
    },

    progressPhoto: {
      type: String,
      default: null,
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

const Progress = mongoose.model(
  "Progress",
  progressSchema
);

export default Progress;