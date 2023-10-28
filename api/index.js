const express = require('express');
const dotenv = require('dotenv')

const app = express();

dotenv.config({ path: './config.env' });
app.use(express.json()); //middleware to understand json
app.use(require('./Router/routes.js'));  // To link the router file for routing purposes

const port = process.env.PORT;

// listening the requests
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})