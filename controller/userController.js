import User from "../model/userModel.js";
import { loginSchema, registerSchema } from "../util/validation.js";
import { createAccessToken, decodeToken } from "../util/token.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

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

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  // });
  const user = new User({ name, email, password });

  await user
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err));

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // role: user.isAdmin,
      // token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
  res.json({ name, email, password });
});

export { loginUser, registerUser };
