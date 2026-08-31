import bcrypt from "bcryptjs";

import Trainer from "../models/Trainer.js";
import User from "../models/User.js";
import Member from "../models/Member.js";

// ========================================
// CREATE TRAINER
// ========================================

export const createTrainer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      address,
      specialization,
      experience,
      qualification,
      joiningDate,
      salary,
    } = req.body;

    // Required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and phone are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "trainer",
    });

    // Create Trainer
    const trainer = await Trainer.create({
      user: user._id,
      phone,
      gender,
      dateOfBirth,
      address,
      specialization,
      experience,
      qualification,
      joiningDate,
      salary,
    });

    const populatedTrainer = await Trainer.findById(trainer._id)
      .populate("user", "name email phone role profileImage");

    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      trainer: populatedTrainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL TRAINERS
// ========================================

export const getTrainers = async (req, res) => {
  try {
    const { search, status, specialization } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i",
      };
    }

    let trainers = await Trainer.find(filter)
      .populate("user", "name email phone role profileImage")
      .sort({ createdAt: -1 });

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();

      trainers = trainers.filter((trainer) => {
        const name = trainer.user?.name?.toLowerCase() || "";
        const email = trainer.user?.email?.toLowerCase() || "";
        const phone = trainer.phone?.toLowerCase() || "";
        const specialization =
          trainer.specialization?.toLowerCase() || "";

        return (
          name.includes(searchTerm) ||
          email.includes(searchTerm) ||
          phone.includes(searchTerm) ||
          specialization.includes(searchTerm)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: trainers.length,
      trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET TRAINER BY ID
// ========================================

export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
      .populate("user", "name email phone role profileImage");

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const members = await Member.find({
      trainer: trainer._id,
    }).populate("user", "name email phone profileImage");

    res.status(200).json({
      success: true,
      trainer,
      members,
      memberCount: members.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE TRAINER
// ========================================

export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      specialization,
      experience,
      qualification,
      joiningDate,
      salary,
      status,
    } = req.body;

    // Update trainer
    trainer.phone = phone ?? trainer.phone;
    trainer.gender = gender ?? trainer.gender;
    trainer.dateOfBirth = dateOfBirth ?? trainer.dateOfBirth;
    trainer.address = address ?? trainer.address;
    trainer.specialization =
      specialization ?? trainer.specialization;
    trainer.experience = experience ?? trainer.experience;
    trainer.qualification =
      qualification ?? trainer.qualification;
    trainer.joiningDate = joiningDate ?? trainer.joiningDate;
    trainer.salary = salary ?? trainer.salary;
    trainer.status = status ?? trainer.status;

    await trainer.save();

    // Update user
    const user = await User.findById(trainer.user);

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;

      await user.save();
    }

    const updatedTrainer = await Trainer.findById(trainer._id)
      .populate("user", "name email phone role profileImage");

    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      trainer: updatedTrainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE TRAINER
// ========================================

export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    // Remove trainer assignment from members
    await Member.updateMany(
      { trainer: trainer._id },
      { $set: { trainer: null } }
    );

    // Delete User
    await User.findByIdAndDelete(trainer.user);

    // Delete Trainer
    await Trainer.findByIdAndDelete(trainer._id);

    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ASSIGN TRAINER TO MEMBER
// ========================================

export const assignTrainer = async (req, res) => {
  try {
    const { trainerId, memberId } = req.body;

    if (!trainerId || !memberId) {
      return res.status(400).json({
        success: false,
        message: "Trainer ID and Member ID are required",
      });
    }

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    if (trainer.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Cannot assign an inactive trainer",
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.trainer = trainer._id;

    await member.save();

    const updatedMember = await Member.findById(member._id)
      .populate("user", "name email phone")
      .populate({
        path: "trainer",
        populate: {
          path: "user",
          select: "name email phone profileImage",
        },
      });

    res.status(200).json({
      success: true,
      message: "Trainer assigned successfully",
      member: updatedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// REMOVE TRAINER FROM MEMBER
// ========================================

export const removeTrainer = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.trainer = null;

    await member.save();

    res.status(200).json({
      success: true,
      message: "Trainer removed from member",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};