const router = require("express").Router();
const member = require("./member");
const book = require("./book");

router.use("/member", member);
router.use("/books", book);

module.exports = router;
