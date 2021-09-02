const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const passportLocalMongoose = require("passport-local-mongoose");

const sessionSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authStrategy: {
      type: String,
      default: "local",
    },
    refreshToken: {
      type: [sessionSchema],
    },
    boards: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Board",
        },
        votes: [
          {
            _id: false,
            feedbackId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Feedback",
            },
            isVoted: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
