const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user is connected');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to our chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('A message created', newMessage);
        io.emit('newMessage', {
            form: newMessage.from,
            message: newMessage.message,
            createdAt: new Date().getTime()
        });
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
