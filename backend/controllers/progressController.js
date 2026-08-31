import Progress from "../models/Progress.js";
import Member from "../models/Member.js";
import Trainer from "../models/Trainer.js";

// ========================================
// CREATE PROGRESS
// ========================================

export const createProgress = async (req, res) => {
  try {
    const {
      memberId,
      trainerId,
      date,
      weight,
      height,
      bodyFat,
      chest,
      waist,
      hips,
      arms,
      thighs,
      progressPhoto,
      notes,
    } = req.body;

    if (!memberId || !weight) {
      return res.status(400).json({
        success: false,
        message: "Member and weight are required",
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

    // Check trainer if provided
    if (trainerId) {
      const trainer = await Trainer.findById(trainerId);

      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: "Trainer not found",
        });
      }
    }

    // Calculate BMI
    let bmi = null;

    if (height && height > 0) {
      const heightInMeters = height / 100;

      bmi =
        weight /
        (heightInMeters * heightInMeters);

      bmi = Number(bmi.toFixed(2));
    }

    const progress = await Progress.create({
      member: memberId,
      trainer: trainerId || null,
      date: date || new Date(),
      weight,
      height: height || null,
      bmi,
      bodyFat: bodyFat || null,
      chest: chest || null,
      waist: waist || null,
      hips: hips || null,
      arms: arms || null,
      thighs: thighs || null,
      progressPhoto: progressPhoto || null,
      notes,
    });

    const populatedProgress =
      await Progress.findById(progress._id)
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
      message: "Progress recorded successfully",
      progress: populatedProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL PROGRESS
// ========================================

export const getProgress = async (req, res) => {
  try {
    const {
      memberId,
      trainerId,
    } = req.query;

    const filter = {};

    if (memberId) {
      filter.member = memberId;
    }

    if (trainerId) {
      filter.trainer = trainerId;
    }

    const progress =
      await Progress.find(filter)
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
        .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// GET MEMBER PROGRESS
// ========================================

export const getMemberProgress = async (
  req,
  res
) => {
  try {
    const { memberId } = req.params;

    const member = await Member.findById(memberId)
      .populate("user", "name email phone");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const progress =
      await Progress.find({
        member: memberId,
      })
        .populate({
          path: "trainer",
          populate: {
            path: "user",
            select: "name",
          },
        })
        .sort({ date: 1 });

    res.status(200).json({
      success: true,
      member,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET PROGRESS BY ID
// ========================================

export const getProgressById = async (
  req,
  res
) => {
  try {
    const progress =
      await Progress.findById(req.params.id)
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

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE PROGRESS
// ========================================

export const updateProgress = async (
  req,
  res
) => {
  try {
    const progress =
      await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    const {
      weight,
      height,
      bodyFat,
      chest,
      waist,
      hips,
      arms,
      thighs,
      progressPhoto,
      notes,
      date,
    } = req.body;

    progress.weight =
      weight ?? progress.weight;

    progress.height =
      height ?? progress.height;

    progress.bodyFat =
      bodyFat ?? progress.bodyFat;

    progress.chest =
      chest ?? progress.chest;

    progress.waist =
      waist ?? progress.waist;

    progress.hips =
      hips ?? progress.hips;

    progress.arms =
      arms ?? progress.arms;

    progress.thighs =
      thighs ?? progress.thighs;

    progress.progressPhoto =
      progressPhoto ?? progress.progressPhoto;

    progress.notes =
      notes ?? progress.notes;

    progress.date =
      date ?? progress.date;

    // Recalculate BMI
    if (
      progress.height &&
      progress.height > 0
    ) {
      const heightInMeters =
        progress.height / 100;

      progress.bmi = Number(
        (
          progress.weight /
          (heightInMeters * heightInMeters)
        ).toFixed(2)
      );
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// DELETE PROGRESS
// ========================================

export const deleteProgress = async (
  req,
  res
) => {
  try {
    const progress =
      await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    await Progress.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Progress deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};