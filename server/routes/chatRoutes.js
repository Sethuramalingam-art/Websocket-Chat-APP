const express = require("express");
const { accessChat, fetchChats } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/").get(protect, fetchChats);
router.post("/", protect, accessChat);
// router.post("/group", protect, createGroupChat);
// router.put("/rename", protect, renameGroup);
// router.put("/groupremove", protect, removeFromGroup);
// router.put("/groupadd", protect, addToGroup);

module.exports = router;
