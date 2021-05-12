import { UserProfile } from "../model/userProfileModel.js";
import { User } from "../model/userModel.js";

const getUserProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    console.log(email);
    const userProfileData = await UserProfile.findOne({ email });
    const userData = await userProfileData.populate("email");

    res.json({
      name: userData.name,
      email: userProfileData.email,
      gender: userProfileData.gender,
      bloodGroup: userProfileData.bloodGroup,
      weight: userProfileData.weight,
      height: userProfileData.height,
      contactNumber: userProfileData.contactNumber,
      emergencyNumber: userProfileData.emergencyNumber,
      emergencyNumber2: userProfileData.emergencyNumber2,
      dateOfBirth: userProfileData.dateOfBirth,
      allergies: userProfileData.allergies,
    });
  } catch (err) {
    next(err);
  }
};

const createUserProfile = async (req, res, next) => {
  try {
    const {
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
      allergies,
    } = req.body;
    console.log({
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
      allergies,
    });
    const newUserProfile = await UserProfile.create({
      email: req.user.email,
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
      allergies,
    });
    // newUserProfile.userId = req.user._id;
    res.json({ ...newUserProfile._doc });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { getUserProfile, createUserProfile };
