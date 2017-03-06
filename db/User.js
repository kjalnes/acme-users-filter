const conn = require('./_conn');
const db = require('../db');
const faker = require('faker');


const User = conn.define('user', {
    firstName: conn.Sequelize.STRING,
    lastName: conn.Sequelize.STRING,
    email: conn.Sequelize.STRING,
    location: conn.Sequelize.ARRAY(conn.Sequelize.STRING)
},
{
    classMethods: {
        countLetters: function() {
            return this.findAll({order: '"lastName" ASC'})
            .then( (users) => {
                var map = users.reduce(function(_map, user) {
                    let letter = user.lastName.slice(0,1)
                    _map[letter] = typeof _map[letter] !== 'undefined' ? _map[letter] : 0;
                    _map[letter]++;
                    return _map
                }, {})
                return map;
            })
        },
        regenerate: function() {
            let users = []
            for(var i=0; i < 100; i++) {
                users.push(User.create({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    location: [ faker.address.latitude(), faker.address.longitude()]
                }))
            }
            Promise.all(users)
            console.log('regenerated users')
        },
        findByLetter: function(letter) {
            return this.findAll({
                where: {
                    lastName: {
                        $like: `${letter}%`
                    }
                }
            })
        }
    }
});

module.exports = User;
