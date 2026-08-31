import User from "../models/User.js";
import Member from "../models/Member.js";
import Trainer from "../models/Trainer.js";
import Membership from "../models/Membership.js";
import Payment from "../models/Payment.js";
import Attendance from "../models/Attendance.js";

// ========================================
// ADMIN DASHBOARD OVERVIEW
// ========================================

export const getDashboardStats = async (req, res) => {
  try {
    // ------------------------------------
    // TOTAL MEMBERS
    // ------------------------------------

    const totalMembers = await Member.countDocuments();


    // ------------------------------------
    // ACTIVE MEMBERS
    // ------------------------------------

    const activeMembers = await Member.countDocuments({
      status: "active",
    });


    // ------------------------------------
    // INACTIVE MEMBERS
    // ------------------------------------

    const inactiveMembers = await Member.countDocuments({
      status: "inactive",
    });


    // ------------------------------------
    // TOTAL TRAINERS
    // ------------------------------------

    const totalTrainers = await Trainer.countDocuments();


    // ------------------------------------
    // ACTIVE TRAINERS
    // ------------------------------------

    const activeTrainers = await Trainer.countDocuments({
      status: "active",
    });


    // ------------------------------------
    // ACTIVE MEMBERSHIPS
    // ------------------------------------

    const activeMemberships =
      await Membership.countDocuments({
        status: "active",
      });


    // ------------------------------------
    // EXPIRED MEMBERSHIPS
    // ------------------------------------

    const expiredMemberships =
      await Membership.countDocuments({
        status: "expired",
      });


    // ------------------------------------
    // TODAY
    // ------------------------------------

    const today = new Date()
      .toISOString()
      .split("T")[0];


    // ------------------------------------
    // TODAY ATTENDANCE
    // ------------------------------------

    const todayAttendance =
      await Attendance.countDocuments({
        date: today,
      });


    // ------------------------------------
    // TODAY CHECK-INS
    // ------------------------------------

    const todayCheckIns =
      await Attendance.countDocuments({
        date: today,
        checkIn: { $ne: null },
      });


    // ------------------------------------
    // TODAY CHECK-OUTS
    // ------------------------------------

    const todayCheckOuts =
      await Attendance.countDocuments({
        date: today,
        checkOut: { $ne: null },
      });


    // ------------------------------------
    // TOTAL REVENUE
    // ------------------------------------

    const revenueResult =
      await Payment.aggregate([
        {
          $match: {
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;


    // ------------------------------------
    // PENDING PAYMENTS
    // ------------------------------------

    const pendingPayments =
      await Payment.countDocuments({
        status: "pending",
      });


    // ------------------------------------
    // TOTAL PAYMENTS
    // ------------------------------------

    const totalPayments =
      await Payment.countDocuments();


    res.status(200).json({
      success: true,

      overview: {
        totalMembers,
        activeMembers,
        inactiveMembers,

        totalTrainers,
        activeTrainers,

        activeMemberships,
        expiredMemberships,

        todayAttendance,
        todayCheckIns,
        todayCheckOuts,

        totalRevenue,
        totalPayments,
        pendingPayments,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// MONTHLY REVENUE
// ========================================

export const getMonthlyRevenue = async (
  req,
  res
) => {
  try {
    const currentYear =
      new Date().getFullYear();

    const revenue =
      await Payment.aggregate([
        {
          $match: {
            status: "completed",
            paidAt: {
              $gte: new Date(
                `${currentYear}-01-01`
              ),
              $lt: new Date(
                `${currentYear + 1}-01-01`
              ),
            },
          },
        },

        {
          $group: {
            _id: {
              month: {
                $month: "$paidAt",
              },
            },

            revenue: {
              $sum: "$amount",
            },

            payments: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    res.status(200).json({
      success: true,
      year: currentYear,
      revenue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// MONTHLY ATTENDANCE
// ========================================

export const getMonthlyAttendance = async (
  req,
  res
) => {
  try {
    const currentYear =
      new Date().getFullYear();

    const attendance =
      await Attendance.aggregate([
        {
          $match: {
            date: {
              $regex: `^${currentYear}-`,
            },
          },
        },

        {
          $group: {
            _id: {
              month: {
                $substr: ["$date", 5, 2],
              },
            },

            total: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    res.status(200).json({
      success: true,
      year: currentYear,
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
// EXPIRING MEMBERSHIPS
// ========================================

export const getExpiringMemberships = async (
  req,
  res
) => {
  try {
    const days =
      Number(req.query.days) || 7;

    const today = new Date();

    const futureDate = new Date();

    futureDate.setDate(
      today.getDate() + days
    );

    const memberships =
      await Membership.find({
        status: "active",

        endDate: {
          $gte: today,
          $lte: futureDate,
        },
      })
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .sort({
          endDate: 1,
        });

    res.status(200).json({
      success: true,
      days,
      count: memberships.length,
      memberships,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// RECENT MEMBERS
// ========================================

export const getRecentMembers = async (
  req,
  res
) => {
  try {
    const limit =
      Number(req.query.limit) || 5;

    const members =
      await Member.find()
        .populate(
          "user",
          "name email phone profileImage"
        )
        .sort({
          createdAt: -1,
        })
        .limit(limit);

    res.status(200).json({
      success: true,
      members,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// RECENT PAYMENTS
// ========================================

export const getRecentPayments = async (
  req,
  res
) => {
  try {
    const limit =
      Number(req.query.limit) || 5;

    const payments =
      await Payment.find()
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .sort({
          createdAt: -1,
        })
        .limit(limit);

    res.status(200).json({
      success: true,
      payments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


