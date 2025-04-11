import mongoose from "mongoose";

const connectDB = async (url) => {
    mongoose.set("strictQuery", true);
  // console.log(url)
    await mongoose.connect(url, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000, 
    })
      .then(() => console.log("MongoDB connected"))
      .catch((err)=> console.log(err)
      );
  };
  
export default connectDB ;