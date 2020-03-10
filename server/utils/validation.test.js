const expect = require('expect');

var {isRealString} = require('./validation');

describe('Is real string', () => {
    it('should reject not-string values', () => {
        var res = isRealString(123);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });
    it('should reject not-string values', () => {
        var res = isRealString('ali');
        expect(res).toBe(true);
    });
});
