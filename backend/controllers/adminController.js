import Doctor from "../models/Doctor.js";
import User from "../models/User.js";


// Approve Doctor


export const approveDoctorController = async (
  req,
  res
) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(
      doctorId
    );

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    if (doctor.status === "approved") {
      return res.status(400).send({
        success: false,
        message: "Doctor already approved",
      });
    }

    doctor.status = "approved";
    await doctor.save();

    const user = await User.findById(
      doctor.userId
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.isDoctor = true;
    user.role = "doctor";

    user.notifications.push({
      type: "doctor-account-approved",
      message:
        "Your doctor account has been approved by admin",
      onClickPath: "/doctor",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: "Doctor approved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error approving doctor",
    });
  }
};


// Get All Doctors


export const getAllDoctorsController = async (
  req,
  res
) => {
  try {
    const doctors = await Doctor.find({}).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to fetch doctors",
    });
  }
};