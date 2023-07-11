const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

// const { isValidObjectId } = require("mongoose");

// const { HttpError } = require("../helpers");

// const upload = (req, res, next) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     next(HttpError(400, `${id} is not valid id`));
//   }
//   next();
// };

module.exports = upload;
