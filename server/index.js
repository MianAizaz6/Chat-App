const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, getUser , removeUser , getUserInRoom} = require('./users');
const PORT = process.env.PORT ||  5000;
const router = require('./router');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connec', (socket)=>{
    socket.on('join',({name,room}, callback)=>{
       const { error , user } = addUser({id:socket.id, name,room}); 
       if(error) return callback(error);

       socket.emit('meassage',{user:'admin', text: `{${user.name},Welcome to the room ${user.room}`});
       socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} has joined the group`});
       socket.join(user.room);
       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
   socket.on('disconnect',()=>{  
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
   }) 
});

app.use(router);
server.listen(PORT , ()=> console.log(`Server has started at port ${PORT}`));