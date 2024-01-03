const path = require('path');
const multer = require('multer');


// Configure Multer with Cloudinary storage
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname);

        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".png" &&
            ext !== ".mp4"
        ) {
            cb(new Error(`Unsupported file type! ${ext}`), false);
            return;
        }

        cb(null, true);
    },
});

module.exports = upload;
