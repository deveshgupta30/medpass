import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  email: { type: String, ref: "User", required: false, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true,
  },
  weight: { type: Number },
  height: { type: Number },
  contactNumber: { type: String, required: true },
  emergencyNumber: { type: String, required: true },
  emergencyNumber2: { type: String },
  dateOfBirth: { type: Date, required: true },
  allergies: { type: String },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export { UserProfile };
