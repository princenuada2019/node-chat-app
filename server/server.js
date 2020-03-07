const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user is connected');

    socket.emit('newMessage', generateMessage('admin', 'welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'a new user joined'));

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('A message created', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.message));
        /*socket.broadcast.emit('newMessage', {
            form: newMessage.from,
            message: newMessage.message,
            createdAt: new Date().getTime()
        });*/
    })
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
