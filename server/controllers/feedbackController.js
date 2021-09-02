const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel");
const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");
const Counter = require("../models/counterModel");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

// @desc Fetch single Feedback Item
// @route GET /api/feedback/:board-slug/:id
// @access Public

const getNextSequence = async (board) => {
  let ret = await Counter.findOneAndUpdate(
    { _id: board },
    { $inc: { seq: 1 } }
  );
  return ret.seq;
};

const getFeedbackItemById = asyncHandler(async (req, res) => {
  const feedbackItem = await Board.aggregate([
    { $unwind: { path: "$feedbackItems" } },
    {
      $match: {
        "feedbackItems._id": {
          $in: [mongoose.Types.ObjectId(req.params.id)],
        },
        slug: req.params.slug,
      },
    },
    {
      $lookup: {
        from: "feedbacks",
        localField: "feedbackItems._id",
        foreignField: "_id",
        as: "feedback",
      },
    },
    { $unwind: "$feedback" },
    { $addFields: { "feedback.id": "$feedbackItems.feedbackId" } },
    { $project: { name: 1, header: 1, description: 1, logo: 1, feedback: 1 } },
  ]);

  if (feedbackItem && feedbackItem.length !== 0) {
    res.json(feedbackItem[0]);
  } else {
    res.status(404);
    throw new Error("Element not found");
  }
});

// @desc Post Feedback Item
// @route GET /api/feedback/:board-slug/new-post
// @access Public

const submitPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const user = await User.find({});

  const feedbackItem = await Feedback.create({
    user: user[0],
    title,
    body,
  });

  const board = await Board.findOne({ slug: req.params.slug });

  if (board) {
    board.feedbackItems.push({
      _id: feedbackItem,
      feedbackId: await getNextSequence(board),
    });
  }

  const udpatedBoard = await board.save();

  // const board = await Board.findOneAndUpdate(
  //   { slug: req.params.slug },
  //   { $push: { feedbackItems: { _id: feedbackItem, feedbackId: 6 } } }
  // );

  if (feedbackItem) {
    res.status(201).json({
      title: feedbackItem.title,
      body: feedbackItem.body,
      votes: feedbackItem.votes,
      status: feedbackItem.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const postNewFeedbackItem = asyncHandler(async (req, res) => {
  res.json("");
});

module.exports = { getFeedbackItemById, postNewFeedbackItem, submitPost };
