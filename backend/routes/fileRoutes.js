const express = require("express");
const fileController = require("./../controllers/fileController");
const upload = require('../utils/upload.js');

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadImage);
router.get('/file/:fileId', fileController.downloadImage);

module.exports = router;