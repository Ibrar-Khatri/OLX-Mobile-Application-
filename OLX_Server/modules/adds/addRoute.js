const express = require("express");
const router = express.Router();
const addController = require("./addController");

router.post("/post-new-add", addController.addNewPostWithDetails);
router.get("/get-all-ads", addController.getAllAds);
router.post("/get-add-by-id", addController.getAddById);
router.post("/get-my-ads", addController.getMyAds);
module.exports = router;
