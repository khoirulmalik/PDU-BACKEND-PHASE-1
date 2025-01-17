const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup multer storage untuk menyimpan file dan memastikan folder uploads ada
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Membuat folder uploads jika belum ada
      console.log("Folder 'uploads/' dibuat");
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname); // Nama file unik
    console.log("Menyimpan file dengan nama:", uniqueName);
    cb(null, uniqueName);
  },
});

// File filter: hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error(
      "Tipe file tidak valid, hanya gambar (jpeg, jpg, png) yang diperbolehkan"
    );
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas ukuran file 5MB
  },
  fileFilter: fileFilter,
}).single("file"); // Menggunakan single upload untuk field 'file'

// Middleware function with error handling
module.exports = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Error dari Multer (misalnya file terlalu besar)
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      // Error lain (misalnya tipe file salah)
      return res
        .status(400)
        .json({ message: "Error upload", error: err.message });
    }
    // Jika tidak ada error, lanjutkan ke controller
    next();
  });
};
