const Controller = require("../controller/controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = require("express").Router();

router.get("/detail/:id", Controller.detail);
router.post("/borrow/:id", authentication, Controller.borowBook);
router.delete(
  "/returnbook/:id",
  authentication,
  authorization,
  Controller.returnBooks
);

module.exports = router;
