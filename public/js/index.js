var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    /*socket.emit('createEmail', {
        to: 'emad@gh.com',
        text: 'Do not let gholomreza diy! I will come soon',
    });*/

    socket.emit('createMessage', {
        to: 'aliGh',
        text: 'ساعت چند خوبه بریم بیرون ؟',
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

/*socket.on('newEmail', function (newEmail) {
    console.log('New email:', newEmail);
});*/

socket.on('newMessage', function (newMessage) {
    console.log('New message', newMessage);
});
