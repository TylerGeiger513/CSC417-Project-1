const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const consumeApi = require('./consume_API');
const axios = require('axios');
require('dotenv').config();


const startClient = async () => {
    await waitForServer(`${process.env.API_INTERNAL_URL}/health`);

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    app.use('/', routes);

    // Serve dynamic config.js
    app.get('/config.js', (req, res) => {
        res.type('application/javascript');
        res.send(`
      window.env = {
        API_URL: "${process.env.API_URL || 'http://localhost:3000/api'}"
      };
    `);
    });

    // Start the server
    const PORT = process.env.CLIENT_PORT || 4200;
    const HOST = process.env.CLIENT_HOST || 'http://localhost';

    app.listen(PORT, () => {
        console.log(`Client running at ${HOST}:${PORT}`);
    });

    consumeApi(process.env.API_INTERNAL_URL);

};

const waitForServer = async (url, retries = 5, delay = 2000) => {
    while (retries > 0) {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                console.log('Server is ready.');
                return true;
            }
        } catch (error) {
            console.error(`Server not ready. Retrying in ${delay / 1000} seconds...`);
            await new Promise((res) => setTimeout(res, delay));
        }
        retries -= 1;
    }
    throw new Error('Server is not ready after multiple retries.');
};


startClient();
