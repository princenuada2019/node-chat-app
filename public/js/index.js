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

socket.on('newLocationMessage', function (newLocation) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">my location</a>');
    a.attr('href', newLocation.url);
    li.text(`${newLocation.from}: `);
    li.append(a);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (data) {
        jQuery('[name=message]').val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click' , function (e) {
    if (!navigator.geolocation) {
        return alert('geolacation is not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch your location.');
    })
});





