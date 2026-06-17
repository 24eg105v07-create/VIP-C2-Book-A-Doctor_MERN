import Doctor from "../models/Doctor.js";
import User from "../models/User.js";


// Apply Doctor


export const applyDoctorController = async (
  req,
  res
) => {
  try {
    const existingDoctor =
      await Doctor.findOne({
        userId: req.user.id,
      });

    if (existingDoctor) {
      return res.status(400).send({
        success: false,
        message:
          "Doctor application already exists",
      });
    }

    const doctor = new Doctor({
      ...req.body,
      userId: req.user.id,
      status: "pending",
    });

    await doctor.save();

    res.status(201).send({
      success: true,
      message:
        "Doctor application submitted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message:
        "Failed to submit application",
    });
  }
};


// Get Doctor Info


export const getDoctorInfoController =
  async (req, res) => {
    try {
      const doctor =
        await Doctor.findOne({
          userId: req.user.id,
        });

      if (!doctor) {
        return res.status(404).send({
          success: false,
          message: "Doctor not found",
        });
      }

      res.status(200).send({
        success: true,
        doctor,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message:
          "Failed to fetch doctor info",
      });
    }
  };


 export const getDoctorByIdController =
  async (req, res) => {
    try {
      const doctor = await Doctor.findOne({
        _id: req.params.id,
        status: "approved",
      });

      if (!doctor) {
        return res.status(404).send({
          success: false,
          message: "Doctor not found",
        });
      }

      res.status(200).send({
        success: true,
        doctor,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message: "Failed to fetch doctor",
      });
    }
  };
// Get Approved Doctors


export const getAllApprovedDoctorsController =
  async (req, res) => {
    try {
      const doctors =
        await Doctor.find({
          status: "approved",
        });

      res.status(200).send({
        success: true,
        doctors,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message:
          "Failed to fetch doctors",
      });
    }
  };