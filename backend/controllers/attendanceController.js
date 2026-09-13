
import Attendance from "../models/Attendance.js";
import Member from "../models/Member.js";
import Membership from "../models/Membership.js";

// ========================================
// SCAN QR
// First scan = TIME IN
// Second scan = TIME OUT
// ========================================

export const scanAttendance = async (req, res) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    // Find member
    const member = await Member.findById(memberId);

   if (!member.membership) {
  return res.status(403).json({
    success: false,
    message: "Member does not have a membership",
  });
}

const membership = await Membership.findById(
  member.membership
);

if (!membership) {
  return res.status(403).json({
    success: false,
    message: "Membership not found",
  });
}

const now = new Date();

if (
  membership.status !== "active" ||
  membership.endDate < now
) {
  return res.status(403).json({
    success: false,
    message: "Membership has expired",
  });
}

    // Check member status
    if (member.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Member account is inactive",
      });
    }

    // Check membership
    if (!member.membership) {
      return res.status(403).json({
        success: false,
        message: "Member does not have an active membership",
      });
    }

    // Today's date
    const today = new Date()
      .toISOString()
      .split("T")[0];

    // Find today's attendance
    let attendance = await Attendance.findOne({
      member: member._id,
      date: today,
    });

    // ========================================
    // FIRST SCAN → TIME IN
    // ========================================

    if (!attendance) {
      attendance = await Attendance.create({
        member: member._id,
        date: today,
        checkIn: new Date(),
        status: "present",
        method: "qr",
      });

      return res.status(201).json({
        success: true,
        type: "check-in",
        message: "Time-In successful",
        attendance,
      });
    }

    // ========================================
    // SECOND SCAN → TIME OUT
    // ========================================

    if (!attendance.checkOut) {
      attendance.checkOut = new Date();

      await attendance.save();

      return res.status(200).json({
        success: true,
        type: "check-out",
        message: "Time-Out successful",
        attendance,
      });
    }

    // ========================================
    // THIRD SCAN → BLOCK
    // ========================================

    return res.status(400).json({
      success: false,
      message: "Attendance already completed for today",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const {
      date,
      memberId,
      startDate,
      endDate,
    } = req.query;

    const filter = {};

    if (date) {
      filter.date = date;
    }

    if (memberId) {
      filter.member = memberId;
    }

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = startDate;
      }

      if (endDate) {
        filter.date.$lte = endDate;
      }
    }

    const attendance = await Attendance.find(filter)
      .populate({
        path: "member",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({
        date: -1,
        checkIn: -1,
      });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMemberAttendance = async (
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

    const attendance = await Attendance.find({
      member: memberId,
    }).sort({
      date: -1,
    });

    const totalDays = attendance.length;

    const completedDays = attendance.filter(
      (item) => item.checkIn && item.checkOut
    ).length;

    res.status(200).json({
      success: true,
      member,
      statistics: {
        totalDays,
        completedDays,
      },
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET TODAY'S ATTENDANCE
// ========================================

export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const attendance = await Attendance.find({
      date: today,
    })
      .populate({
        path: "member",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({
        checkIn: -1,
      });

    res.status(200).json({
      success: true,
      date: today,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

