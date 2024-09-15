import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import connectToMongo from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
connectToMongo();

app.use(express.json());
// Use CORS and specify your frontend domain
app.use(
  cors({
    origin:
      "https://client-cfvt95jpp-syed-muhammad-ahsan-alis-projects.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // If your requests include credentials like cookies
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`NoteNexus backend listening on port ${port}`);
});
