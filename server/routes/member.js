const Controller = require("../controller/controller");
const authentication = require("../middleware/authentication");

const router = require("express").Router();

router.post("/login", Controller.login);
router.get("/detail", authentication, Controller.detailMember);
module.exports = router;
