import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import connectToMongo from "./config/db.js";

dotenv.config();
connectToMongo();

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`NoteNexus backend listening on port ${port}`);
});
