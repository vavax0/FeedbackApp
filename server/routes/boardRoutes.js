const express = require("express");
const getBoardBySlug =
  require("../controllers/boardController.js").getBoardBySlug;

const router = express.Router();

router.route("/:slug").get(getBoardBySlug);

module.exports = router;
