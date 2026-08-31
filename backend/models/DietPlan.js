import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: [
        "breakfast",
        "morning_snack",
        "lunch",
        "evening_snack",
        "dinner",
        "post_workout",
      ],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      trim: true,
    },

    foods: [
      {
        type: String,
        trim: true,
      },
    ],

    calories: {
      type: Number,
      default: 0,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fats: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const dietPlanSchema = new mongoose.Schema(
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
        "weight_gain",
        "muscle_gain",
        "maintenance",
        "general",
      ],
      default: "general",
    },

    dailyCalories: {
      type: Number,
      default: 0,
    },

    dailyProtein: {
      type: Number,
      default: 0,
    },

    dailyCarbs: {
      type: Number,
      default: 0,
    },

    dailyFats: {
      type: Number,
      default: 0,
    },

    meals: [mealSchema],

    waterIntake: {
      type: Number,
      default: 2,
    },

    durationWeeks: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: [
        "active",
        "completed",
        "inactive",
      ],
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

const DietPlan = mongoose.model(
  "DietPlan",
  dietPlanSchema
);

export default DietPlan;