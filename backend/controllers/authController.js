import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// Register User

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};


// Login User

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDoctor: user.isDoctor,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Login failed",
    });
  }
};


// Current User

export const currentUserController = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to get user",
    });
  }
};


// Get Notifications

export const getNotificationsController =
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      res.status(200).send({
        success: true,
        notifications: user.notifications,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message: "Failed to fetch notifications",
      });
    }
  };

 
// Mark All Notifications Read

export const markAllNotificationsController =
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      user.seenNotifications.push(
        ...user.notifications
      );

      user.notifications = [];

      await user.save();

      res.status(200).send({
        success: true,
        message: "Notifications marked as read",
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message: "Failed to mark notifications",
      });
    }
  };