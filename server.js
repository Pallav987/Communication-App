const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages')

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Communication Bot";

// Run when client connects
io.on("connection", (socket) => {

  socket.emit('message',formatMessage(botName,'Welcome to Communication App'));

  //BroadCast when a user connects
  socket.broadcast.emit('message',formatMessage(botName,' A user has joined the chat'));

  // Runs when client disconnect
  socket.on('disconnect',()=>{
    io.emit('meesage',formatMessage(botName,'A user has left the chat'));
  });

  // Listen For chat messages 
  socket.on('chatMessage', msg => {
    io.emit('message',formatMessage('USER',msg));
  });  
});

const PORT = process.env.PORT || 8089;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
