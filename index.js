const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

// Routes
require('./routes/test1')(app);
require('./routes/test2')(app);


const PORT = 9999;

app.listen(PORT);