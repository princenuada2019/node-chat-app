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

    /*socket.emit('newEmail', {
        from: 'ali@gh.com',
        text: 'gholomreza is dying! come soon.',
        createdAt: 1243
    });*/

    socket.emit('newMessage', {
        from: 'chamanfa',
        text: 'عصر میای بیرون ؟ ساعت 6 و نیم',
        createdAt: '12:30'
    });

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });

    /*socket.on('createEmail', (email) => {
        console.log(email);
    });*/

    socket.on('createMessage', (newMessage) => {
        console.log('A message created', newMessage);
    })
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
