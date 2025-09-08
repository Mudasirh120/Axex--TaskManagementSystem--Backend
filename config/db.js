import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGODB_URL}/Axex`);
    console.log("MongoDb connected Successfully", res.connection.host);
  } catch (error) {
    console.log("Error connecting MongoDb => ", error);
    process.exit(1);
  }
};
export default connectDB;
