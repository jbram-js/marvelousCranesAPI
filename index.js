require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
const CraneRouter = require("./routes/cranes");
const usersRouter = require("./routes/users");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.options('*', cors());

db.on("error", (err) => console.error(err));
db.once("open", () => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
        //app.use("/api/v2/Static", express.static("public"));
        app.use("/", CraneRouter);
        app.use("/", usersRouter);
    });
});

module.exports = app;