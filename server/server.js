const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
const boardRoutes = require("./routes/boardRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

dotenv.config();

require("./utils/JwtStrategy");
require("./utils/LocalStrategy");
require("./middleware/authenticate");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// const feedback = require("./data.js");

connectDB();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(process.env.COOKIE_SECRET));
  
  const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : [];
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  server.use(cors(corsOptions));
  server.use(passport.initialize());
  server.use(passport.session());

  server.use("/api/boards", boardRoutes);
  server.use("/api/feedback", feedbackRoutes);
  server.use("/api/users", userRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
