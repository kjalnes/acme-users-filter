const express = require('express');
const app = express.Router();
const conn = require('./db')


app.get('/', (req, res, next) => {
    Promise.all([
        conn.User.findAll({order: '"lastName" ASC'}),
        conn.User.countLetters()
    ])
    .then( ( result) => res.render('index', { users: result[0], letters: result[1] }))
    .catch( err => console.log(err))
});

app.post('/regenerate', (req, res, next) => {
    conn.sync()
    .then( () => conn.User.regenerate() )
    .then( () => res.redirect('/') )
    .catch( err => console.log(err))
})

app.get('/users/filter/:letter', (req, res, next) => {
    let letter = req.params.letter;
    Promise.all([
        conn.User.findByLetter(letter),
        conn.User.countLetters()
    ])
    .then( (result) => res.render('index', { users: result[0], letters: result[1]}))
    .catch( err => console.log(err))
});

module.exports = app;
