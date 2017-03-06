const express = require('express');
const app = express();
const conn = require('./db');
const path = require('path');
const swig = require('swig');
const routes = require('./routes');
swig.setDefaults({ cache: false });

app.use('/boot', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', routes);

// sync and connect
conn.sync()
.then( () => conn.seed());

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Port ${port} is a beautiful port`));
