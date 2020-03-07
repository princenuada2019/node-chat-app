var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {
    console.log('New message', newMessage);

    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (data) {
        console.log('ok!', data)
    })
});
