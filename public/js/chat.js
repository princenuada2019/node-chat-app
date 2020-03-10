var socket = io();

moment.loadPersian();

function scrollToBottom() {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');

    let newMessageHeight = newMessage.innerHeight();
    let lastNewMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastNewMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        timestamp: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (newLocation) {
    var formattedTime = moment(newLocation.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: newLocation.from,
        url: newLocation.url,
        timestamp: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('updateOnlineUsersList', function (users) {
    var ol = jQuery('<ol></ol>')

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click' , function () {
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





