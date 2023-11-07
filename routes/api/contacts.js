const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts/index");
const { validateBody, authenticate } = require("../../middlewares/index");

const { addSchema, updateFavorite } = require("../../schemas/index");

router.get("/", authenticate, controller.getAll);

router.get("/:contactId", authenticate, controller.getContactById);

router.post("/", authenticate, validateBody(addSchema), controller.addContact);

router.delete("/:contactId", authenticate, controller.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(addSchema),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateFavorite),
  controller.updateFavorite
);

module.exports = router;
