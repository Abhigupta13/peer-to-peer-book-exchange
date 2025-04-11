import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from './routes/bookRoutes.js';
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express();

app.use(morgan("short"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Peer To Peer Book Exchange Backend system is Running...");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
