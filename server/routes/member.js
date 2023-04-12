const Controller = require("../controller/controller");
const authentication = require("../middleware/authentication");

const router = require("express").Router();

router.get("/fetchmember", Controller.showMember);
router.post("/login", Controller.login);
router.get("/detail", authentication, Controller.detailborrow);
module.exports = router;
