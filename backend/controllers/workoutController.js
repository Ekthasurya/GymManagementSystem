import WorkoutPlan from "../models/WorkoutPlan.js";
import Member from "../models/Member.js";
import Trainer from "../models/Trainer.js";



// ========================================
// CREATE WORKOUT PLAN
// ========================================

export const createWorkoutPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      memberId,
      trainerId,
      goal,
      difficulty,
      durationWeeks,
      exercises,
      startDate,
      endDate,
      notes,
    } = req.body;

    if (
      !name ||
      !memberId ||
      !trainerId ||
      !durationWeeks
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, member, trainer and duration are required",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const workoutPlan = await WorkoutPlan.create({
      name,
      description,
      member: memberId,
      trainer: trainerId,
      goal,
      difficulty,
      durationWeeks,
      exercises: exercises || [],
      startDate: startDate || new Date(),
      endDate: endDate || null,
      notes,
    });

    const populatedPlan =
      await WorkoutPlan.findById(workoutPlan._id)
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .populate({
          path: "trainer",
          populate: {
            path: "user",
            select: "name email phone",
          },
        });

    res.status(201).json({
      success: true,
      message: "Workout plan created successfully",
      workoutPlan: populatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// GET ALL WORKOUT PLANS
// ========================================

export const getWorkoutPlans = async (req, res) => {
  try {
    const {
      memberId,
      trainerId,
      status,
    } = req.query;

    const filter = {};

    if (memberId) {
      filter.member = memberId;
    }

    if (trainerId) {
      filter.trainer = trainerId;
    }

    if (status) {
      filter.status = status;
    }

    const workoutPlans =
      await WorkoutPlan.find(filter)
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .populate({
          path: "trainer",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workoutPlans.length,
      workoutPlans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// GET WORKOUT PLAN BY ID
// ========================================

export const getWorkoutPlanById = async (
  req,
  res
) => {
  try {
    const workoutPlan =
      await WorkoutPlan.findById(req.params.id)
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .populate({
          path: "trainer",
          populate: {
            path: "user",
            select: "name email phone",
          },
        });

    if (!workoutPlan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    res.status(200).json({
      success: true,
      workoutPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPDATE WORKOUT PLAN
// ========================================

export const updateWorkoutPlan = async (
  req,
  res
) => {
  try {
    const workoutPlan =
      await WorkoutPlan.findById(req.params.id);

    if (!workoutPlan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    const {
      name,
      description,
      goal,
      difficulty,
      durationWeeks,
      exercises,
      status,
      startDate,
      endDate,
      notes,
    } = req.body;

    workoutPlan.name =
      name ?? workoutPlan.name;

    workoutPlan.description =
      description ?? workoutPlan.description;

    workoutPlan.goal =
      goal ?? workoutPlan.goal;

    workoutPlan.difficulty =
      difficulty ?? workoutPlan.difficulty;

    workoutPlan.durationWeeks =
      durationWeeks ?? workoutPlan.durationWeeks;

    workoutPlan.exercises =
      exercises ?? workoutPlan.exercises;

    workoutPlan.status =
      status ?? workoutPlan.status;

    workoutPlan.startDate =
      startDate ?? workoutPlan.startDate;

    workoutPlan.endDate =
      endDate ?? workoutPlan.endDate;

    workoutPlan.notes =
      notes ?? workoutPlan.notes;

    await workoutPlan.save();

    res.status(200).json({
      success: true,
      message: "Workout plan updated successfully",
      workoutPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ========================================
// DELETE WORKOUT PLAN
// ========================================

export const deleteWorkoutPlan = async (
  req,
  res
) => {
  try {
    const workoutPlan =
      await WorkoutPlan.findById(req.params.id);

    if (!workoutPlan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    await WorkoutPlan.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Workout plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};