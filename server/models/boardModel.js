const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    feedbackItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: "feedback",
        },
        feedbackId: {
          type: Number,
          required: true,
        },
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
