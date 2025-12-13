import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/projects", projectRoutes);

export default app;
