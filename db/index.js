const User = require('./User');
const conn = require('./_conn')
const faker = require('faker');


let _connect;

const connect = () => {
    if(_connect) {
        return _connect;
    }
    _connect = conn.authenticate()
    return _connect;
}

const seed = () => {
    return connect()
    .then( () => {
        Promise.all([
            User.create({firstName: 'Moon', lastName: 'Alnes'}),
            User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName() }),
            User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName() }),
            User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName() })
        ])
    console.log('seeded')
    });
}

const sync = () => {
    return connect()
    .then( () => {
        console.log('the ship is syncing')
        return conn.sync({ force: true })
    });
}

module.exports = {
    User,
    seed,
    sync
}
