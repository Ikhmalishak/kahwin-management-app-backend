const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guest.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware").validate;
const { guestSchema } = require("../validators/guest.validator");

router.post("/", authenticate, validate(guestSchema), guestController.createGuest);
router.get("/", authenticate, guestController.getGuests);
router.get("/:id", authenticate, guestController.getGuestById);
router.put("/:id", authenticate, validate(guestSchema), guestController.updateGuest);
router.delete("/:id", authenticate, guestController.deleteGuest);

module.exports = router;