const express = require('express');
const app = express();
const conn = require('./db');
const path = require('path');
const swig = require('swig');
swig.setDefaults({ cache: false });

app.use('/boot', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', (req, res, next) => {
    Promise.all([
        conn.User.findAll(),
        conn.User.countLetters()
    ])
    .then( ( result) => {
        res.render('index', { users: result[0], letters: result[1] });
    })
    .catch( err => console.log(err))
});

app.post('/regenerate', (req, res, next) => {
    conn.sync()
    .then( () => conn.User.regenerate() )
    .then( () => res.redirect('/') )
})


app.get('/users/filter/:letter', (req, res, next) => {
    let letter = req.params.letter;
    Promise.all([
        conn.User.findByLetter(letter),
        conn.User.countLetters()
    ])
    .then( (result) => {
         res.render('index', { users: result[0], letters: result[1]})
    })
});

// sync and connect
conn.sync()
.then( () => conn.seed());


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Port ${port} is a beautiful port`));
