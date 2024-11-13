const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
const port = 4000;

// Middleware untuk mengizinkan akses CORS (diperlukan untuk komunikasi dengan frontend)
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder uploads untuk file gambar yang diupload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", uploadRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
