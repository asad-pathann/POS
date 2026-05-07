import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`✅ Database Connected Successfully`.green.bold);
    console.log(`Host: ${mongoose.connection.host}`.cyan);
  } catch (error) {
    console.log("❌ Database Connection Failed 😢".red.bold);
    console.error("Error Details:".red, error.message); // ← Yeh zaroori hai
    throw error; // ← Server ko pata chale error aaya hai
  }
};
