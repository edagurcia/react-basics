import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import { corsConfig } from "./config/cors";

config();
connectDB();

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/v1/projects", projectRoutes);

export default app;
