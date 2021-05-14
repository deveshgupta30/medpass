import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
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
  profilePic: { type: String },
  address: { type: String, required: true },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export { UserProfile };
