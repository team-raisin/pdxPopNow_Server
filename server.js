require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = 2000 || process.env.PORT;





// eslint-disable-next-line no-console
app.listen(2000, () => console.log(`Listening on ${PORT}`));
