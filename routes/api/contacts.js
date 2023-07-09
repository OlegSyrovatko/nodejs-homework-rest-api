const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ctrl = require("../../controllers/contacts/index");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

const tempDir = path.join(__dirname, "../../", "temp");
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});
router.post(
  "/",
  authenticate,
  upload.single("cover"),
  validateBody(schemas.addSchema),
  ctrl.add
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);
router.delete("/:id", authenticate, isValidId, ctrl.deleteById);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
module.exports = router;
