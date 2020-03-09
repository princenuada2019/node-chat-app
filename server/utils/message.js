const monent = require('moment-jalaali');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: monent().valueOf()
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt: monent().valueOf()
  }
};


module.exports = {generateMessage, generateLocationMessage};
