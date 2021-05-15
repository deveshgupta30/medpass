import { UserProfile } from "../model/userProfileModel.js";
import { User } from "../model/userModel.js";

const getUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const userProfileData = await UserProfile.findOne({ userId }).populate({
      path: "userId",
      select: "name email",
    });

    res.json({
      name: userProfileData.userId.name,
      email: userProfileData.userId.email,
      gender: userProfileData.gender,
      bloodGroup: userProfileData.bloodGroup,
      weight: userProfileData.weight,
      height: userProfileData.height,
      contactNumber: userProfileData.contactNumber,
      emergencyNumber: userProfileData.emergencyNumber,
      emergencyNumber2: userProfileData.emergencyNumber2,
      dateOfBirth: userProfileData.dateOfBirth,
      allergies: userProfileData.allergies,
      profilePic: userProfileData.profilePic,
      address: userProfileData.address,
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
      profilePic,
      address,
    } = req.body;
    // console.log({
    //   gender,
    //   bloodGroup,
    //   weight,
    //   height,
    //   contactNumber,
    //   emergencyNumber,
    //   emergencyNumber2,
    //   dateOfBirth,
    //   allergies,
    //   address,
    // });
    res.json({ message: "Hello" });
    const newUserProfile = await UserProfile.create({
      userId: req.user._id,
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
      allergies,
      profilePic,
      address,
    });
    // newUserProfile.userId = req.user._id;
    res.json({ ...newUserProfile._doc });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const {
      name,
      gender,
      bloodGroup,
      weight,
      height,
      contactNumber,
      emergencyNumber,
      emergencyNumber2,
      dateOfBirth,
      allergies,
      profilePic,
      address,
    } = req.body;
    const updatedUserProfile = await UserProfile.findOne({ userId });
    updatedUserProfile.gender = gender;
    updatedUserProfile.bloodGroup = bloodGroup;
    updatedUserProfile.weight = weight;
    updatedUserProfile.height = height;
    updatedUserProfile.contactNumber = contactNumber;
    updatedUserProfile.emergencyNumber = emergencyNumber;
    updatedUserProfile.emergencyNumber2 = emergencyNumber2;
    updatedUserProfile.dateOfBirth = dateOfBirth;
    updatedUserProfile.allergies = allergies;
    updatedUserProfile.profilePic = profilePic;
    updatedUserProfile.address = address;
    await updatedUserProfile.save();
    const updatedUser = await User.findById(userId);
    updatedUser.name = name;
    await updatedUser.save();
    res.json({ message: "User Profile Updated" });
    // res.json({
    //   name: userProfileData.userId.name,
    //   email: userProfileData.userId.email,
    //   gender: userProfileData.gender,
    //   bloodGroup: userProfileData.bloodGroup,
    //   weight: userProfileData.weight,
    //   height: userProfileData.height,
    //   contactNumber: userProfileData.contactNumber,
    //   emergencyNumber: userProfileData.emergencyNumber,
    //   emergencyNumber2: userProfileData.emergencyNumber2,
    //   dateOfBirth: userProfileData.dateOfBirth,
    //   allergies: userProfileData.allergies,
    // });
  } catch (err) {
    next(err);
  }
};

const getAllProfile = async (req, res, next) => {
  try {
    const allProfile = await User.find();

    const allProfileData = await UserProfile.find();
    res.json({ allProfile, allProfileData });
  } catch (err) {
    next(err);
  }
};

export { getUserProfile, createUserProfile, updateUserProfile, getAllProfile };
