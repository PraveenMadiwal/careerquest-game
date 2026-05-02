const express = require("express");
const router = express.Router();

const { getUser, updateXP } = require("../controllers/userController");

router.get("/", getUser);
router.post("/xp", updateXP);

module.exports = router;