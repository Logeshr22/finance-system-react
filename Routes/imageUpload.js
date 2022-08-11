const express = require("express");
const router = express.Router();
const {upload,uploadImage}  = require("../Controllers/userImageController");
router.post("/upload",uploadImage, upload);


module.exports = router; 