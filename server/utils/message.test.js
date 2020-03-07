const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('aligh', 'hello');
        expect(res.from).toBe('aligh');
        expect(res.text).toBe('hello');
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct locaiton object', () => {
        var res = generateLocationMessage('aligh', 1, 1);
        expect(res.from).toBe('aligh');
        expect(res.url).toBe('https://www.google.com/maps?q=1,1');
        expect(res.createdAt).toBeA('number');
    });
});

