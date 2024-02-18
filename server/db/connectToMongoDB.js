import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongoDB");
  } catch(error) {
    console.log("error connecting to Mongodb", error.message);
  }
};

export default connectToMongoDB;
