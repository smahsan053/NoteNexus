import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fetchUser } from "../middlewares/fetchuser.middleware.js";

dotenv.config();
const router = express.Router();

// Route 01: create a user usinG: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Name cannot be empty and must be atleast 3 charachers long")
      .isString()
      .isLength({ min: 3 })
      .exists(),
    body("email", "Invalid email address").isEmail().isString().exists(),
    body(
      "password",
      "Password must be 8-30 characters long and contain both letters and numbers"
    )
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,30}$/)
      .isLength({ min: 8, max: 30 })
      .exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ success, error: errors.array() });
      } else {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({
            success,
            error: "Sorry a user with this email already exists",
          });
        }
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
        user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        const payload = {
          id: user.id,
        };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET);
        success = true;
        return res.json({ success, authToken });
      }
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

//ROUTE 02:  Authenticate a user usinG: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Invalid email address").isEmail(),
    body(
      "password",
      "Password must be 8-30 characters long and contain both letters and numbers"
    )
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,30}$/)
      .isLength({ min: 8, max: 30 })
      .exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ success, error: errors.array() });
      } else {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({
            success,
            error: "Please try to login with correct credentials",
          });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(400).json({
            success,
            error: "Please try to login with correct credentials",
          });
        }
        const payload = {
          id: user.id,
        };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET);
        success = true;
        return res.json({ success, authToken });
      }
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

//ROUTE 03: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

export default router;
