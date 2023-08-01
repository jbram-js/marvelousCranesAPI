require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
const CraneRouter = require("./routes/cranes");
const usersRouter = require("./routes/users");

//just a comment again
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//removed the cors settings
app.use(cors());
app.use(express.json());
app.options("*", cors());

db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    app.use("/", CraneRouter);
    app.use("/", usersRouter);
    var sign_s3 = require("./controllers/sign_s3");
    app.use("/sign_s3", sign_s3.sign_s3);
  });
});

module.exports = app;
