
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";


// Book Appointment


export const bookAppointmentController = async (
  req,
  res
) => {
  try {
    const {
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
    } = req.body;

    // Validation
    if (
      !doctorId ||
      !doctorInfo ||
      !userInfo ||
      !date ||
      !time
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Doctor
    const doctor = await Doctor.findById(
      doctorId
    );

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check Slot Availability
    const existingAppointment =
      await Appointment.findOne({
        doctorId,
        date,
        time,
        status: {
          $in: ["pending", "approved"],
        },
      });

    if (existingAppointment) {
      return res.status(400).send({
        success: false,
        message:
          "Appointment slot already booked",
      });
    }

    // Create Appointment
    const appointment = new Appointment({
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
      userId: req.user.id,
      status: "pending",
    });

    await appointment.save();

    // Notify Doctor
    const doctorUser = await User.findById(
      doctor.userId
    );

    if (doctorUser) {
      doctorUser.notifications.push({
        type: "new-appointment-request",
        message:
          "You have a new appointment request",
        onClickPath:
          "/doctor/appointments",
      });

      await doctorUser.save();
    }

    res.status(201).send({
      success: true,
      message:
        "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to book appointment",
    });
  }
};


// Get Doctor Appointments


export const getDoctorAppointmentsController =
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

      const appointments =
        await Appointment.find({
          doctorId: doctor._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).send({
        success: true,
        appointments,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message:
          "Failed to fetch appointments",
      });
    }
  };


// Update Appointment Status


export const updateAppointmentStatusController =
  async (req, res) => {
    try {
      const {
        appointmentId,
        status,
      } = req.body;

      if (
        status !== "approved" &&
        status !== "rejected"
      ) {
        return res.status(400).send({
          success: false,
          message: "Invalid status",
        });
      }

      const appointment =
        await Appointment.findByIdAndUpdate(
          appointmentId,
          { status },
          { new: true }
        );

      if (!appointment) {
        return res.status(404).send({
          success: false,
          message:
            "Appointment not found",
        });
      }

      const user =
        await User.findById(
          appointment.userId
        );

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      user.notifications.push({
        type:
          "appointment-status-updated",
        message: `Your appointment has been ${status}`,
        onClickPath:
          "/user/appointments",
      });

      await user.save();

      res.status(200).send({
        success: true,
        message:
          "Appointment status updated",
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message:
          "Failed to update appointment",
      });
    }
  };


// Get User Appointments


export const getUserAppointmentsController =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).send({
        success: true,
        appointments,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        success: false,
        message:
          "Failed to fetch user appointments",
      });
    }
  };

