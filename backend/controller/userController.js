import { UserProfile } from "../model/userProfileModel.js";
import { User } from "../model/userModel.js";

const getUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const userProfileData = await UserProfile.findById(userId);
    const { name, email } = user;
    res.json({ name, email });
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
    } = req.body;
    const newUserProfile = await UserProfile.create({
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
    });
    // newUserProfile.userId = req.user._id;
    res.json({ ...newUserProfile._doc });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { getUserProfile, createUserProfile };
