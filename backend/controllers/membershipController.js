import MembershipPlan from "../models/MembershipPlan.js";
import Membership from "../models/Membership.js";
import Member from "../models/Member.js";

// ========================================
// CREATE MEMBERSHIP PLAN
// ========================================

export const createPlan = async (req, res) => {
  try {
    const {
      name,
      duration,
      durationType,
      price,
      description,
      features,
    } = req.body;

    if (!name || !duration || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, duration and price are required",
      });
    }

    const existingPlan = await MembershipPlan.findOne({
      name,
      status: "active",
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: "Membership plan already exists",
      });
    }

    const plan = await MembershipPlan.create({
      name,
      duration,
      durationType,
      price,
      description,
      features,
    });

    res.status(201).json({
      success: true,
      message: "Membership plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL PLANS
// ========================================

export const getPlans = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const plans = await MembershipPlan.find(filter)
      .sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET SINGLE PLAN
// ========================================

export const getPlanById = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(
      req.params.id
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE PLAN
// ========================================

export const updatePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(
      req.params.id
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    const {
      name,
      duration,
      durationType,
      price,
      description,
      features,
      status,
    } = req.body;

    plan.name = name ?? plan.name;
    plan.duration = duration ?? plan.duration;
    plan.durationType =
      durationType ?? plan.durationType;
    plan.price = price ?? plan.price;
    plan.description =
      description ?? plan.description;
    plan.features = features ?? plan.features;
    plan.status = status ?? plan.status;

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Membership plan updated successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE PLAN
// ========================================

export const deletePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(
      req.params.id
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    // Don't delete if memberships are using it
    const membershipCount =
      await Membership.countDocuments({
        plan: plan._id,
      });

    if (membershipCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete plan because it has membership records. Deactivate it instead.",
      });
    }

    await MembershipPlan.findByIdAndDelete(
      plan._id
    );

    res.status(200).json({
      success: true,
      message: "Membership plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// ASSIGN MEMBERSHIP TO MEMBER
// ========================================

export const assignMembership = async (req, res) => {
  try {
    const {
      memberId,
      planId,
      startDate,
      paymentStatus,
      notes,
    } = req.body;

    if (!memberId || !planId) {
      return res.status(400).json({
        success: false,
        message: "Member ID and Plan ID are required",
      });
    }

    // Find member
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Find plan
    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    if (plan.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This membership plan is inactive",
      });
    }

    // Calculate dates
    const start = startDate
      ? new Date(startDate)
      : new Date();

    const end = new Date(start);

    if (plan.durationType === "days") {
      end.setDate(
        end.getDate() + plan.duration
      );
    }

    if (plan.durationType === "months") {
      end.setMonth(
        end.getMonth() + plan.duration
      );
    }

    if (plan.durationType === "years") {
      end.setFullYear(
        end.getFullYear() + plan.duration
      );
    }

    // Create membership
    const membership = await Membership.create({
      member: member._id,
      plan: plan._id,
      startDate: start,
      endDate: end,
      amount: plan.price,
      paymentStatus:
        paymentStatus || "pending",
      notes,
      status: "active",
    });

    // Update member
    member.membership = membership._id;
    member.status = "active";

    await member.save();

    const populatedMembership =
      await Membership.findById(
        membership._id
      )
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .populate("plan");

    res.status(201).json({
      success: true,
      message: "Membership assigned successfully",
      membership: populatedMembership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET MEMBER MEMBERSHIP
// ========================================

export const getMemberMembership = async (
  req,
  res
) => {
  try {
    const memberships =
      await Membership.find({
        member: req.params.memberId,
      })
        .populate("plan")
        .sort({ createdAt: -1 });

    if (!memberships.length) {
      return res.status(404).json({
        success: false,
        message: "No membership found",
      });
    }

    res.status(200).json({
      success: true,
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
// RENEW MEMBERSHIP
// ========================================

export const renewMembership = async (
  req,
  res
) => {
  try {
    const {
      memberId,
      planId,
      paymentStatus,
      notes,
    } = req.body;

    if (!memberId || !planId) {
      return res.status(400).json({
        success: false,
        message: "Member ID and Plan ID are required",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    // Start from today
    const start = new Date();

    const end = new Date(start);

    if (plan.durationType === "days") {
      end.setDate(
        end.getDate() + plan.duration
      );
    }

    if (plan.durationType === "months") {
      end.setMonth(
        end.getMonth() + plan.duration
      );
    }

    if (plan.durationType === "years") {
      end.setFullYear(
        end.getFullYear() + plan.duration
      );
    }

    const membership =
      await Membership.create({
        member: member._id,
        plan: plan._id,
        startDate: start,
        endDate: end,
        amount: plan.price,
        paymentStatus:
          paymentStatus || "pending",
        notes,
        status: "active",
      });

    member.membership = membership._id;
    member.status = "active";

    await member.save();

    const populatedMembership =
      await Membership.findById(
        membership._id
      ).populate("plan");

    res.status(201).json({
      success: true,
      message: "Membership renewed successfully",
      membership: populatedMembership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

