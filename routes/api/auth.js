const express = require("express");

const {
  validateBody,
  authenticate,
  upload,
} = require("../../middlewares/index");

const {
  authSchema,
  updateSubscription,
  emailSchema,
} = require("../../schemas/index");

const controller = require("../../controllers/auth/index");

const router = express.Router();

// signup
router.post("/register", validateBody(authSchema), controller.register);

// login
router.post("/login", validateBody(authSchema), controller.login);

// current
router.get("/current", authenticate, controller.getCurrent);

// logout
router.post("/logout", authenticate, controller.logout);

// update subscription
router.patch(
  "/",
  authenticate,
  validateBody(updateSubscription),
  controller.updateSubscription
);

// upload avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.uploadAvatar
);

// verifying email
router.get("/verify/:verificationToken", controller.verifyEmail);

router.post("/verify", validateBody(emailSchema), controller.resendVerifyEmail);

module.exports = router;
