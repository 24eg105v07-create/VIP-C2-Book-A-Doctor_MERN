import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Authorization failed",
    });
  }
};

export default adminMiddleware;