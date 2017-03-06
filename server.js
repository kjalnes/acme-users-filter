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
    conn.User.findAll()
    .then( ( result) => {
        console.log('!!!!!!!!!!!!!!!!!!!!!!', result)
        res.render('index', { users: result });
    })
    .catch( err => console.log(err))
});


// sync and connect
conn.sync()
.then( () => conn.seed());


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Port ${port} is a beautiful port`));
