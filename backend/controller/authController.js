import { User } from "../model/userModel.js";
import { registerSchema, loginSchema } from "../util/validation.js";
import { createAccessToken, decodedToken } from "../util/jwtToken.js";

const login = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync({ ...req.body });
    const { email, password } = result;
    const user = await await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(400);
      throw new Error("User is not registered");
    }
    const isMatch = await user.isValidPassword(password, user.password);
    console.log({ isMatch });
    if (user && isMatch) {
      const accessToken = await createAccessToken(
        user._id,
        user.email,
        user.role
      );
      const decodedAccessToken = await decodedToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const { exp: accessExpiresAt } = decodedAccessToken;
      res.json({
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          userId: user.userId,
        },
        accessToken,
        accessExpiresAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user credentials");
    }
  } catch (err) {
    if (err.isJoi === true) res.status(400);
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync({ ...req.body });
    const { name, email, password } = result;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400);
      throw new Error("User already exist.");
    }
    // const userId = (email) => {
    //   if (email) {
    //     const randomDigit = Math.floor(Math.random() * 90000) + 10000;
    //     const modEmail = email.split("@")[0];
    //     return modEmail + randomDigit;
    //   }
    // };
    const newUser = await User.create({
      //   userId: userId(),
      name,
      email,
      password,
    });
    if (newUser) {
      const accessToken = await createAccessToken(
        newUser._id,
        newUser.email,
        newUser.role
      );
      const decodedAccessToken = await decodedToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const { exp: accessExpiresAt } = decodedAccessToken;
      res.status(201).json({
        userInfo: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          //   userId: newUser.userId,
        },
        accessToken,
        accessExpiresAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422); //Unprocessable entity error code
    }
    next(err);
  }
};

export { register, login };
