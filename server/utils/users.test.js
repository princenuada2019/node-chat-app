const expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach ( () => {
       users = new Users();
       users.users = [
           {
               id: '1',
               name: 'ali',
               room: 'love'
           },
           {
               id: '2',
               name: 'emad',
               room: 'study'
           },
           {
               id: '3',
               name: 'reza',
               room: 'love'
           }
       ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'ali',
            room: 'love'
        };
        var res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for love room', () => {
        var usersList = users.getUsersList('love');

        expect(usersList).toEqual(['ali', 'reza']);
    });

    it('should return names for study room', () => {
        var usersList = users.getUsersList('study');

        expect(usersList).toEqual(['emad']);
    });

    it('should remove a user by id', () => {
        var res = users.removeUser('1');

        expect(res.id).toBe('1');
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user by id', () => {
        var res = users.removeUser('12');

        expect(res).toNotExist();
        expect(users.users.length).toBe(3);
    });



    it('should find user by id', () => {
        var res = users.getUser('3');
        expect(res).toEqual(users.users[2]);
    });

    it('should not find user by id', () => {
        var res = users.getUser('233');
        expect(res).toNotExist();
    });
});
