const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Communication Bot";

// Run when client connects
io.on("connection", (socket) => {

  socket.emit('message','welcome to communication app');

  //BroadCast when a user connects
  socket.broadcast.emit('message','A user has joined the chat');

  // Runs when client disconnect
  socket.on('disconnect',()=>{
    io.emit('meesage','A user has left the chat')
  })
});

const PORT = process.env.PORT || 8089;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
