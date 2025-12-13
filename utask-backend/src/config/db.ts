import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;

    console.log(colors.bgCyan.blue.bold(`Database Server on port ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white(error.message));
    console.log(colors.bgRed.white("Database connection error"));
    process.exit(1);
  }
};
