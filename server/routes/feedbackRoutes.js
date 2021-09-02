const express = require("express");
const getFeedbackItemById =
  require("../controllers/feedbackController.js").getFeedbackItemById;
const postNewFeedbackItem =
  require("../controllers/feedbackController.js").postNewFeedbackItem;
  const submitPost =
  require("../controllers/feedbackController.js").submitPost;

const router = express.Router();

router.route("/:slug/new-post").post(submitPost);
router.route("/:slug/:id").get(getFeedbackItemById);


module.exports = router;
