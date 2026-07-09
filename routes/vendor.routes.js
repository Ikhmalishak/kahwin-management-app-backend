const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendor.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { vendorSchema } = require("../validators/vendor.validator");

router.post("/", authenticate, validate(vendorSchema), vendorController.createVendor);
router.get("/", authenticate, vendorController.getVendors);
router.get("/:id", authenticate, vendorController.getVendorById);
router.put("/:id", authenticate, validate(vendorSchema), vendorController.updateVendor);
router.delete("/:id", authenticate, vendorController.deleteVendor);

module.exports = router;