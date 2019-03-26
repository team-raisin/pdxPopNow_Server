const express = require('express');
const app = express();
const cors = require('./middleware/cors')
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(express.json());
app.use(cors);
app.use(connection);
app.use('/artist', require('./routes/artist'));

app.use(handler);

module.exports = app;
