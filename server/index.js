const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const config = require("./config/keys");

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("===DB error=== ::: " + err);
  });

app.use(cors());

//application/x-www-form-urlencoded >> 이렇게 된 데이터를 분석해서 가져 올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));
//application/json >> 이렇게 된 데이터를 분석해서 가져 올 수 있게 해줌
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/thumbs", require("./routes/thumbs"));

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

// app.listen(5000);
