const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.post("/sign-up", userController.signUpWithDetails);
router.post("/sign-in", userController.signInWithDetails);

module.exports = router;
