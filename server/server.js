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

// Use CORS and specify your frontend domain
const corsOptions = {
  origin: "https://client-mu-snowy.vercel.app", // Frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // If you're using credentials (like cookies or authentication tokens)
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// Handling preflight (OPTIONS) requests for CORS
app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://client-mu-snowy.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`NoteNexus backend listening on port ${port}`);
});
