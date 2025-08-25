import express from "express";
import Community from "../models/Community.js";
import Report from "../models/Report.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Create a community
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    const community = await Community.create({
      name,
      description,
      isPublic,
      createdBy: req.user.id,
      members: [req.user.id], // creator is first member
    });

    res.status(201).json(community);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Community name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

//Delete a community (creator only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (community.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only the creator can delete this community" });
    }

    await Community.findByIdAndDelete(req.params.id);

    // optional: delete all reports in this community
    await Report.deleteMany({ community: req.params.id });

    res.json({ message: "Community and its reports deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update a community (creator only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    const community = await Community.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { name, description, isPublic },
      { new: true }
    );

    if (!community) {
      return res
        .status(404)
        .json({ message: "Community not found or not authorized" });
    }

    res.json({ message: "Community updated successfully", community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Join a community
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (community.members.includes(req.user.id)) {
      return res.status(400).json({ message: "Already a member" });
    }

    community.members.push(req.user.id);
    await community.save();

    res.json({ message: "Joined successfully", community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Leave a community
router.post("/:id/leave", authMiddleware, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.members.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of this community" });
    }

    community.members = community.members.filter(
      (memberId) => memberId.toString() !== req.user.id
    );
    await community.save();

    res.json({ message: "Left successfully", community });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all communities the logged-in user is a member of
router.get("/my-communities", authMiddleware, async (req, res) => {
  try {
    const communities = await Community.find({ members: req.user.id });
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get communities for a specific user (created or joined)
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const communities = await Community.find({
      $or: [{ members: userId }, { createdBy: userId }],
    });

    if (!communities || communities.length === 0) {
      return res.status(404).json({ message: "No communities found" });
    }

    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get community details by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate("createdBy", "name email") // populate creator details
      .populate("members", "name email"); // populate members

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all communities (for discovery/search)
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find().select(
      "name description isPublic members"
    );
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
