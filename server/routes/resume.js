const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const jwt = require("jsonwebtoken");

// Middleware to check auth
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// POST /api/resume/create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.userId,
      ...req.body,
    });

    const saved = await resume.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save resume", error: err.message });
  }
});

// GET /api/resume/mine
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resumes", error: err.message });
  }
});

// DELETE /api/resume/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await Resume.deleteOne({
      _id: req.params.id,
      userId: req.userId, // ensure user can only delete their own
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Resume not found or not allowed" });
    }

    res.status(200).json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete resume", error: err.message });
  }
});



module.exports = router;
