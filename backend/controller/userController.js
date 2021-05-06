import { UserProfile } from "../model/userProfileModel.js";
import { User } from "../model/userModel.js";

const getUserData = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    // const userProfileData = await UserProfile.findById(userId);
    const user = await User.findById(userId);
    const { name, email } = user;
    res.json({ name, email });
  } catch (err) {
    next(err);
  }
};
