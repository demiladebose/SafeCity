import express from "express";
import Report from "../models/Report.js";
import Community from "../models/Community.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Create a report
router.post("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const { title, description, location, communityId } = req.body;

    if (!communityId) {
      return res.status(400).json({ message: "communityId is required" });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isMember = community.members.some(
      (memberId) => memberId.toString() === req.user.id
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You must be a member to report in this community" });
    }

    const imageUrl = req.file ? req.file.path : null;

    const report = await Report.create({
      title,
      description,
      location,
      imageUrl,
      reportedBy: req.user.id,
      community: communityId,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a report (by creator or community admin)
router.put("/:id", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const community = await Community.findById(report.community);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isReporter = report.reportedBy.toString() === req.user.id;
    const isAdmin = community.createdBy.toString() === req.user.id;

    if (!isReporter && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to edit" });
    }

    if (title) report.title = title;
    if (description) report.description = description;
    if (location) report.location = location;

    if (req.file) {
      report.imageUrl = req.file.path;
    }

    await report.save();
    res.json({ message: "Report updated successfully", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reports for a specific community
router.get("/community/:communityId", authMiddleware, async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.isPublic && !community.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this community" });
    }

    const reports = await Report.find({ community: communityId })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single report by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate(
      "reportedBy",
      "name email"
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const community = await Community.findById(report.community);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isReporter = report.reportedBy._id.toString() === req.user.id;
    const isAdmin = community.createdBy.toString() === req.user.id;
    const isMember = community.members.includes(req.user.id);

    // Allow only admin, reporter, or community members to view
    if (!isReporter && !isAdmin && !isMember) {
      return res.status(403).json({ message: "Not authorized to view report" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update report status (admin only)
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const community = await Community.findById(report.community);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isAdmin = community.createdBy.toString() === req.user.id;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Not authorized to update status" });
    }

    report.status = status;
    await report.save();

    res.json({ message: "Status updated successfully", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
