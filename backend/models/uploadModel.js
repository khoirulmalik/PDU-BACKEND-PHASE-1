const mongoose = require("mongoose");

// Definisikan schema untuk menyimpan informasi upload
const uploadSchema = new mongoose.Schema({
  tanggalUpload: {
    type: String,
    required: true, // Nama file yang diupload
  },
  volumeBatu: {
    type: Number,
    required: true, // Volume batu harus ada
  },
  jumlahBatu: {
    type: Number,
    required: true, // Jumlah batu harus ada
  },
  namaFile: {
    type: String,
    required: true, // Nama file yang diupload
  },
});

// Membuat model dari schema
const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
