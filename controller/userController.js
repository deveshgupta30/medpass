import User from "../model/userModel.js";
import { loginSchema, registerSchema } from "../util/validation.js";
import { createAccessToken, decodeToken } from "../util/token.js";
import mongoose from "mongoose";

const loginUser = async (req, res, next) => {
  try {
    // validate the incoming request from form
    const result = await loginSchema.validateAsync({ ...req.body });
    const { email, password } = result;
    // find the user from email
    const user = await User.findOne({ email });
    //if user is not available in db then throw error user is not registered
    if (!user) {
      res.status(400);
      throw new Error("User is not registered");
    }
    // check the password whether match entered password in form with password stored in the db
    const isMatch = await user.isValidPassword(password, user.password);
    // if user avaiable and password match then give login access
    if (user && isMatch) {
      // create access token
      const accessToken = await createAccessToken(
        user._id,
        user.email,
        user.role
      );
      // decode the access token to send expiry time to the client
      const decodedAccessToken = await decodeToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const { exp: accessExpiresAt } = decodedAccessToken;
      // send the json to the client information containing about user
      res.json({
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
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

const registerUser = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync({ ...req.body });
    const { email, name, password } = result;
    const userDoesExist = await User.findOne({ email });
    if (userDoesExist) {
      res.status(401);
      throw new Error("Another user already exist with this email ");
      return;
    }
    console.log(mongoose.connection.readyState);
    // let a = new User({ name, email, password })
    //   .then((user) => user.save())
    //   .then((doc) => console.log(doc))
    //   .catch((err) => console.log(err));
    // const user = new User({ name, email, password });
    // await user.save();
    const user = await User.create({ name, email, password });
    const accessToken = await createAccessToken(
      user._id,
      user.email,
      user.role
    );
    console.log({ accessToken });
    // decode the access token to send expiry time to the client
    const decodedAccessToken = await decodeToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const { exp: accessExpiresAt } = decodedAccessToken;
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        accessExpiresAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422); //Unprocessable Entity  error code 422
    }
    console.log(err);
    next(err);
  }
};

export { loginUser, registerUser };
