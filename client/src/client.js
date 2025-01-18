const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const consumeApi = require('./consume_API');

const startClient = async () => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    app.use('/', routes);

    // Start the server
    const PORT = 4200;
    app.listen(PORT, () => {
        console.log(`Client is running at http://localhost:${PORT}`);
    });

    
};

startClient();
