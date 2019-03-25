const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(require('./middleware/cors'));

app.use('/directory', connection, require('./routes/directory'));
app.use('/artist', connection, require('./routes/artist'));

app.use(handler);

module.exports = app;
