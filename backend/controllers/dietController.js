import DietPlan from "../models/DietPlan.js";
import Member from "../models/Member.js";
import Trainer from "../models/Trainer.js";

// ========================================
// CREATE DIET PLAN
// ========================================

export const createDietPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      memberId,
      trainerId,
      goal,
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFats,
      meals,
      waterIntake,
      durationWeeks,
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

    // Check member
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Check trainer
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const dietPlan = await DietPlan.create({
      name,
      description,
      member: memberId,
      trainer: trainerId,
      goal,
      dailyCalories: dailyCalories || 0,
      dailyProtein: dailyProtein || 0,
      dailyCarbs: dailyCarbs || 0,
      dailyFats: dailyFats || 0,
      meals: meals || [],
      waterIntake: waterIntake || 2,
      durationWeeks,
      startDate: startDate || new Date(),
      endDate: endDate || null,
      notes,
    });

    const populatedPlan =
      await DietPlan.findById(dietPlan._id)
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
      message: "Diet plan created successfully",
      dietPlan: populatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ========================================
// GET ALL DIET PLANS
// ========================================

export const getDietPlans = async (req, res) => {
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

    const dietPlans =
      await DietPlan.find(filter)
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
      count: dietPlans.length,
      dietPlans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ========================================
// GET DIET PLAN BY ID
// ========================================

export const getDietPlanById = async (
  req,
  res
) => {
  try {
    const dietPlan =
      await DietPlan.findById(req.params.id)
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

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.status(200).json({
      success: true,
      dietPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPDATE DIET PLAN
// ========================================

export const updateDietPlan = async (
  req,
  res
) => {
  try {
    const dietPlan =
      await DietPlan.findById(req.params.id);

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    const {
      name,
      description,
      goal,
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFats,
      meals,
      waterIntake,
      durationWeeks,
      status,
      startDate,
      endDate,
      notes,
    } = req.body;

    dietPlan.name =
      name ?? dietPlan.name;

    dietPlan.description =
      description ?? dietPlan.description;

    dietPlan.goal =
      goal ?? dietPlan.goal;

    dietPlan.dailyCalories =
      dailyCalories ?? dietPlan.dailyCalories;

    dietPlan.dailyProtein =
      dailyProtein ?? dietPlan.dailyProtein;

    dietPlan.dailyCarbs =
      dailyCarbs ?? dietPlan.dailyCarbs;

    dietPlan.dailyFats =
      dailyFats ?? dietPlan.dailyFats;

    dietPlan.meals =
      meals ?? dietPlan.meals;

    dietPlan.waterIntake =
      waterIntake ?? dietPlan.waterIntake;

    dietPlan.durationWeeks =
      durationWeeks ?? dietPlan.durationWeeks;

    dietPlan.status =
      status ?? dietPlan.status;

    dietPlan.startDate =
      startDate ?? dietPlan.startDate;

    dietPlan.endDate =
      endDate ?? dietPlan.endDate;

    dietPlan.notes =
      notes ?? dietPlan.notes;

    await dietPlan.save();

    res.status(200).json({
      success: true,
      message: "Diet plan updated successfully",
      dietPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// ========================================
// DELETE DIET PLAN
// ========================================

export const deleteDietPlan = async (
  req,
  res
) => {
  try {
    const dietPlan =
      await DietPlan.findById(req.params.id);

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    await DietPlan.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Diet plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


