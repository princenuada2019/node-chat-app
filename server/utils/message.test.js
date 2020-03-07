const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('aligh', 'hello');
        expect(res.from).toBe('aligh');
        expect(res.text).toBe('hello');
        expect(res.createdAt).toBeA('number');
    });
});

