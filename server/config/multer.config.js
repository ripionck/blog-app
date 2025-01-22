const multer = require("multer");

const storage = multer.diskStorage({}); // Keeps the file in memory for Cloudinary

const fileFilter = (req, file, cb) => {
  // Accept only images (jpg, jpeg, png)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png) are allowed."), false);
  }
};

const limits = {
  fileSize: 2 * 1024 * 1024, // 2 MB
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
