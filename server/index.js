const express = require("express");
const connectDB = require("./config/db");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const dataPath = "./data/data.json";
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

dotenv.config();

connectDB();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

//get dat from local json file
// app.get("/api/chats", (req, res) => {
//   fs.readFile(dataPath, "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     }

//     res.send(JSON.parse(data));
//   });
// });

// app.get("/api/chats/:id", (req, res) => {
//   fs.readFile(dataPath, "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     const singleChat = JSON.parse(data);
//     const sendData = singleChat.filter((val) => val._id === req.params.id);
//     res.send(sendData);
//   });
// });

app.use("/api/user", userRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log("Server started on PORT 5000");
});
