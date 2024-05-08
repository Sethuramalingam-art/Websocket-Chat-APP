const express = require("express");
const connectDB = require("./config/db");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const dataPath = "./data/data.json";
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

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

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

// At a given interval (the pingInterval value sent in the handshake) the server sends a
// PING packet and the client has a few seconds (the pingTimeout value) to send a PONG packet back.
// If the server does not receive a PONG packet back, it will consider that the connection is closed.
//  Conversely, if the client does not receive a PING packet within pingInterval + pingTimeout,
//  it will consider that the connection is closed.
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  // create a new socket instance for setup  and adding user data's
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //when source user click the destination user to chat, that user will be added to room
  //now both chat partners are in same room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  //to show the typing animation while user typing the message
  socket.on("typing", (room) => socket.in(room).emit("typing"));

  //stop typing animation when chat partner stop the typing
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //when chat partner send a new message need to receive the message
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      //if it is group chat, source chat partner no need to recieve the message in the same group
      if (user._id == newMessageRecieved.sender._id) return;
      //except sender in the group chat all will receive the message
      //'in' is socket method which is used for inside the room all the group members / single chat recieve the message
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
