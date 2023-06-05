const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUers} = require('./utils/users');

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Communication Bot";

// Run when client connects
io.on("connection", (socket) => {
    socket.on('joinRoom',({username,room}) =>{

        const user = userJoin(socket.id,username,room);
        console.log(username);
        socket.join(user.room);
       
        // Welcome current user
        socket.emit('message',formatMessage(botName,'Welcome to Communication App'));
        // Broadcast when user connect
        socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));
    });

  socket.emit('message',formatMessage(botName,'Welcome to Communication App'));

  //BroadCast when a user connects
  socket.broadcast.emit('message',formatMessage(botName,' A user has joined the chat'));

  // Runs when client disconnect
  socket.on('disconnect',() => {
    const user = userLeave(socket.id);
    if(user){
        io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`));
    }    
  });

  // Listen For chat messages 
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message',formatMessage(user.username,msg));
  });  
});

const PORT = process.env.PORT || 8089;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
