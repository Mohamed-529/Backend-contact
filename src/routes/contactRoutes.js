const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/contactController");

const {
validateContact
} =
require("../validators/contactValidator");


router.post(
"/",
validateContact,
controller.create
);

router.get(
"/",
controller.getAll
);

router.get(
"/:contactId",
controller.getById
);

router.put(
"/:contactId",
controller.update
);

router.delete(
"/:contactId",
controller.delete
);

module.exports =
router;