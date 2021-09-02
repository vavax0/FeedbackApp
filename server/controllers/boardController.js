const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel.js");
const Feedback = require("../models/feedbackModel.js");

// @desc Fetch single board
// @route GET /api/boards/:id
// @access Public

const getBoardBySlug = asyncHandler(async (req, res) => {
  const board = await Board.findOne({ slug: req.params.slug }).populate({
    path: "feedbackItems._id",
    model: Feedback,
    // options: { sort: { votes: -1} },
  });

  if (board) {
    res.json(board);
  } else {
    res.status(404);
    throw new Error("Board not found");
  }
});

module.exports = { getBoardBySlug };
