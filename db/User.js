const conn = require('./_conn');
const db = require('../db');
const faker = require('faker');


const User = conn.define('user', {
    firstName: conn.Sequelize.STRING,
    lastName: conn.Sequelize.STRING
},
{
    classMethods: {
        createAndCount: function() {
            return this.findAll()
            .then( (users) => {
                var map = users.reduce(function(_map, user) {
                    let letter = user.lastName.slice(0,1)
                    _map[letter] = typeof _map[letter] !== 'undefined' ? _map[letter] : 0;
                    _map[letter]++;
                    return _map
                }, {})
                // console.log('MAP ==========', map)
                return map;
            });
        },
        regenerate: function() {
            let users = []
            for(var i=0; i < 20; i++) {
                users.push(User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName() }))
            }
            Promise.all(users)
            console.log('regenerated users')
        }
    }
});

module.exports = User;
