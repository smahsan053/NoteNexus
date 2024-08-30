import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import connectToMongo from "./config/db.js";
import cors from "cors";

dotenv.config();
connectToMongo();

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.listen(port, () => {
  console.log(`NoteNexus backend listening on port ${port}`);
});
