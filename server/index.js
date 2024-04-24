const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
const dataPath = "./data/data.json";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chats", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

app.get("/api/chats/:id", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    const singleChat = JSON.parse(data);
    const sendData = singleChat.filter((val) => val._id === req.params.id);
    res.send(sendData);
  });
});

app.listen(PORT, (req, res) => {
  console.log("Server started on PORT 5000");
});
