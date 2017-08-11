const app = require('./app');
const {createIndexIfNotExists} = require('./models/doctors');
// Load environmental variables from .env file.
require('dotenv').config();

const port = process.env.PORT || 8080;

createIndexIfNotExists()
    .then(() => {
        app.listen(port, () => console.log(`listening on port ${port}`));
    })
    .catch(err => {
        throw new Error(err);
    });
