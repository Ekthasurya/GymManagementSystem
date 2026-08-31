import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    muscleGroup: {
      type: String,
      trim: true,
    },

    sets: {
      type: Number,
      default: 3,
    },

    reps: {
      type: Number,
      default: 10,
    },

    duration: {
      type: Number,
      default: 0,
    },

    restTime: {
      type: Number,
      default: 60,
    },

    instructions: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const workoutPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },

    goal: {
      type: String,
      enum: [
        "weight_loss",
        "muscle_gain",
        "strength",
        "fitness",
        "endurance",
        "general",
      ],
      default: "general",
    },

    difficulty: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
      ],
      default: "beginner",
    },

    durationWeeks: {
      type: Number,
      required: true,
      min: 1,
    },

    exercises: [exerciseSchema],

    status: {
      type: String,
      enum: ["active", "completed", "inactive"],
      default: "active",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
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

const WorkoutPlan = mongoose.model(
  "WorkoutPlan",
  workoutPlanSchema
);

export default WorkoutPlan;