const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user is connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateOnlineUsersList', users.getUsersList(params.room));

        // socket.leave('The love room')

        //io.emit() -> io.to('The love room').emit()
        //socket.broadcast.emit() -> socket.broadcast.to('The love room').emit()
        //socket.emit()

        socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the ${params.room} room`));

        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var deletedUser = users.removeUser(socket.id);
        console.log(deletedUser);

        if (deletedUser) {
            io.to(deletedUser.room).emit('updateOnlineUsersList', users.getUsersList(deletedUser.room));
            io.to(deletedUser.room).emit('newMessage', generateMessage('Admin', `${deletedUser.name} has leave the chat`));
        }
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
