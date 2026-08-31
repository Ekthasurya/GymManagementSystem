import Member from "../models/Member.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ========================================
// CREATE MEMBER
// ========================================

export const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      joiningDate,
    } = req.body;

    // Validate required fields
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
      role: "member",
    });

    // Create Member
    const member = await Member.create({
      user: user._id,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      joiningDate,
    });

    // Return populated member
    const populatedMember = await Member.findById(member._id)
      .populate("user", "name email phone role");

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      member: populatedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL MEMBERS
// ========================================

export const getMembers = async (req, res) => {
  try {
    const {
      search,
      status,
      gender,
    } = req.query;

    let filter = {};

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Gender filter
    if (gender) {
      filter.gender = gender;
    }

    let members = await Member.find(filter)
      .populate("user", "name email phone role")
      .populate("trainer", "user specialization experience")
      .populate("membership");

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();

      members = members.filter((member) => {
        const name = member.user?.name?.toLowerCase() || "";
        const email = member.user?.email?.toLowerCase() || "";
        const phone = member.phone?.toLowerCase() || "";

        return (
          name.includes(searchTerm) ||
          email.includes(searchTerm) ||
          phone.includes(searchTerm)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: members.length,
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
// GET SINGLE MEMBER
// ========================================

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate("user", "name email phone role profileImage")
      .populate("trainer")
      .populate("membership");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE MEMBER
// ========================================

export const updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      joiningDate,
      status,
    } = req.body;

    // Update Member fields
    member.phone = phone ?? member.phone;
    member.gender = gender ?? member.gender;
    member.dateOfBirth = dateOfBirth ?? member.dateOfBirth;
    member.address = address ?? member.address;
    member.emergencyContact =
      emergencyContact ?? member.emergencyContact;
    member.joiningDate = joiningDate ?? member.joiningDate;
    member.status = status ?? member.status;

    await member.save();

    // Update User
    const user = await User.findById(member.user);

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;

      await user.save();
    }

    const updatedMember = await Member.findById(member._id)
      .populate("user", "name email phone role")
      .populate("trainer")
      .populate("membership");

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
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
// DELETE MEMBER
// ========================================

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Delete associated user
    await User.findByIdAndDelete(member.user);

    // Delete member
    await Member.findByIdAndDelete(member._id);

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};