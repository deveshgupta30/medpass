import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true,
  },
  weight: { type: Number },
  height: { type: Number },
  contactNumber: { type: Number, required: true },
  emergencyNumber: { type: Number, required: true },
  emergencyNumber2: { type: Number },
  dateOfBirth: { type: Date, required: true },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export { UserProfile };
