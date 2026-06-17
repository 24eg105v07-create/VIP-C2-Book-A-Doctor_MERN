import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    doctorInfo: {
      type: Object,
      required: true,
    },

    userInfo: {
      type: Object,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster appointment lookups
appointmentSchema.index({
  doctorId: 1,
  date: 1,
  time: 1,
});

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);

export default Appointment;