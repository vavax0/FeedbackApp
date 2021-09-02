const express = require("express");
const authUser = require("../controllers/userController").authUser;
const refreshToken = require("../controllers/userController").refreshToken;
const userLogout = require("../controllers/userController").userLogout;
const protect = require("../middleware/authMiddleware").protect;
const admin = require("../middleware/authMiddleware").admin;
const verifyUser = require("../middleware/authenticate").verifyUser;
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require("../utils/LocalStrategy");

router.route("/");
router.post("/login", passport.authenticate("local"), authUser);
router.post("/refreshToken", refreshToken);
router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});
router.get("/logout", verifyUser, userLogout);

module.exports = router;
