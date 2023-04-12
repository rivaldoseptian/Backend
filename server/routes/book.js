const Controller = require("../controller/controller");
const authentication = require("../middleware/authentication");
const {
  authorization,
  authorizationBorrow,
} = require("../middleware/authorization");

const router = require("express").Router();

router.get("/fetchbook", Controller.showBooks);
router.post(
  "/borrow/:id",
  authentication,
  authorizationBorrow,
  Controller.borowBook
);
router.delete(
  "/returnbook/:id",
  authentication,
  authorization,
  Controller.returnBooks
);

module.exports = router;
