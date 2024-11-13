const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // Mengimpor middleware yang sudah disesuaikan
const uploadController = require("../controllers/uploadController");

// Rute untuk upload file
router.post("/upload", upload, uploadController.uploadImage); // Menggunakan middleware langsung tanpa .single()

module.exports = router;
