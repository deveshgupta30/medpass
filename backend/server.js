import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import { router as authRoutes } from "./router/authRoute.js";
import { router as profileRoutes } from "./router/profileRouter.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "200kb" }));

app.use(cors());

connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("It's working.");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);
