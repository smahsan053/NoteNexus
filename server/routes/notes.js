import express from "express";
import { fetchUser } from "../middlewares/fetchuser.middleware.js";
import Note from "../models/note.model.js";
import { validationResult, body } from "express-validator";

const router = express.Router();
// Route 01 - Get All the Notes using: GET "/api/notes/fetchallnotes". login required

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

// Route 02: Add a new Note using: POST "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters")
      .exists()
      .isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters")
      .exists()
      .isLength({ min: 5 }),
    body("tag", "Tag must be atleast 3 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 03: Update an existing note using: PUT "/api/notes/updatenote". login required
router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters")
      .optional()
      .isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters")
      .optional()
      .isLength({ min: 5 }),
    body("tag", "Tag must be atleast 3 characters").optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      let note = await Note.findById(req.params.id);
      // req.params.id is the object id of note not user's id
      if (!note) {
        return res.status(404).send("Not Found");
      }
      // checking if the owner is actually upating note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 04: Delete an existing note using: DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let noteId = req.params.id;
    let userId = req.user.id;
    let note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion only if user owns this note
    if (note.user.toString() !== userId) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(noteId);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error", error });
  }
});

export default router;
