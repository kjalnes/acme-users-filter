const conn = require('./_conn');


const User = conn.define('user', {
    firstName: conn.Sequelize.STRING,
    lastName: conn.Sequelize.STRING
},
{
    classMethod: {

    }
});

module.exports = User;
