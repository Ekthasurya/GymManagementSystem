import Payment from "../models/Payment.js";
import Member from "../models/Member.js";
import Membership from "../models/Membership.js";

// ========================================
// RECORD PAYMENT
// ========================================

export const createPayment = async (req, res) => {
  try {
    const {
      memberId,
      membershipId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      paymentDate,
      notes,
    } = req.body;

    if (
      !memberId ||
      !membershipId ||
      amount === undefined ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Member, membership, amount and payment method are required",
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

    // Check membership
    const membership = await Membership.findById(
      membershipId
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found",
      });
    }

    // Make sure membership belongs to member
    if (
      membership.member.toString() !==
      member._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This membership does not belong to this member",
      });
    }

    // Generate receipt number
    const receiptNumber = `GYM-${Date.now()}`;

    const payment = await Payment.create({
      member: member._id,
      membership: membership._id,
      amount,
      paymentMethod,
      paymentStatus:
        paymentStatus || "completed",
      transactionId,
      paymentDate: paymentDate || new Date(),
      notes,
      receiptNumber,
    });

    // Update membership payment status
    if (payment.paymentStatus === "completed") {
      membership.paymentStatus = "paid";
      await membership.save();
    }

    const populatedPayment =
      await Payment.findById(payment._id)
        .populate({
          path: "member",
          populate: {
            path: "user",
            select: "name email phone",
          },
        })
        .populate({
          path: "membership",
          populate: {
            path: "plan",
          },
        });

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment: populatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL PAYMENTS
// ========================================

export const getPayments = async (req, res) => {
  try {
    const {
      status,
      paymentMethod,
      startDate,
      endDate,
    } = req.query;

    const filter = {};

    if (status) {
      filter.paymentStatus = status;
    }

    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }

    if (startDate || endDate) {
      filter.paymentDate = {};

      if (startDate) {
        filter.paymentDate.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        filter.paymentDate.$lte = end;
      }
    }

    const payments = await Payment.find(filter)
      .populate({
        path: "member",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .populate({
        path: "membership",
        populate: {
          path: "plan",
          select: "name duration durationType price",
        },
      })
      .sort({ paymentDate: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET PAYMENT BY ID
// ========================================

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: "member",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .populate({
        path: "membership",
        populate: {
          path: "plan",
        },
      });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET MEMBER PAYMENT HISTORY
// ========================================

export const getMemberPayments = async (
  req,
  res
) => {
  try {
    const member = await Member.findById(
      req.params.memberId
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const payments = await Payment.find({
      member: member._id,
    })
      .populate({
        path: "membership",
        populate: {
          path: "plan",
        },
      })
      .sort({ paymentDate: -1 });

    const totalPaid = payments
      .filter(
        (payment) =>
          payment.paymentStatus === "completed"
      )
      .reduce(
        (total, payment) => total + payment.amount,
        0
      );

    res.status(200).json({
      success: true,
      count: payments.length,
      totalPaid,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ========================================
// UPDATE PAYMENT
// ========================================

export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const {
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      paymentDate,
      notes,
    } = req.body;

    payment.amount = amount ?? payment.amount;

    payment.paymentMethod =
      paymentMethod ?? payment.paymentMethod;

    payment.paymentStatus =
      paymentStatus ?? payment.paymentStatus;

    payment.transactionId =
      transactionId ?? payment.transactionId;

    payment.paymentDate =
      paymentDate ?? payment.paymentDate;

    payment.notes = notes ?? payment.notes;

    await payment.save();

    // Update membership status
    const membership = await Membership.findById(
      payment.membership
    );

    if (membership) {
      if (payment.paymentStatus === "completed") {
        membership.paymentStatus = "paid";
      } else if (
        payment.paymentStatus === "pending"
      ) {
        membership.paymentStatus = "pending";
      } else if (
        payment.paymentStatus === "failed"
      ) {
        membership.paymentStatus = "pending";
      }

      await membership.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// DELETE PAYMENT
// ========================================

export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await Payment.findByIdAndDelete(
      payment._id
    );

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

