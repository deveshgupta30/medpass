import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.ATLAS_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log(
      `MongoDB Connected: ${con.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;
