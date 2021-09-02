const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users.js");
const boards = require("./data/boards.js");
const feedbacks = require("./data/feedbacks.js");
const User = require("./models/userModel.js");
const Board = require("./models/boardModel.js");
const Feedback = require("./models/feedbackModel.js");
const connectDB = require("./config/db.js");
const Counter = require("./models/counterModel.js");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Feedback.deleteMany();
    await Board.deleteMany();
    await User.deleteMany();
    await Counter.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const randomUser = createUsers[1]._id;

    const ada = await User.register(
      { email: "ada@example.com", name: "Ada" },
      "123456"
    );
    ada.save();

    const feedbackList = feedbacks.map((feedback) => {
      return { ...feedback, user: randomUser };
    });

    const createFeedback = await Feedback.insertMany(feedbackList);

    console.log(createFeedback);

    createFeedback[0].user = adminUser;
    createFeedback[1].user = adminUser;
    createFeedback[2].user = adminUser;
    createFeedback[3].user = adminUser;

    const feedback1 = createFeedback[0]._id;
    const feedback2 = createFeedback[1]._id;
    const feedback3 = createFeedback[2]._id;
    const feedback4 = createFeedback[3]._id;

    const sampleBoards = boards.map((board) => {
      return {
        ...board,
        admin: adminUser,
        feedbackItems: [
          { _id: feedback1, feedbackId: 1 },
          { _id: feedback2, feedbackId: 2 },
          { _id: feedback3, feedbackId: 3 },
          { _id: feedback4, feedbackId: 4 },
        ],
      };
    });

    console.log(sampleBoards);

    const finalBoards = await Board.insertMany(sampleBoards);

    const counter = await Counter.insertMany([
      { _id: finalBoards[0]._id, seq: 5 },
      { _id: finalBoards[1]._id, seq: 5 },
    ]);

    const updatedUsers = await User.updateMany(
      { boards: [] },
      {
        $set: {
          boards: finalBoards.map((boa) => {
            return {
              _id: boa._id,
              votes: [{ feedbackId: feedback1, isVoted: true }],
            };
          }),
        },
      }
    );
    console.log("Updated Users");
    console.log(updatedUsers);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Feedback.deleteMany();
    await Board.deleteMany();
    await User.deleteMany();
    await Counter.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
