const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const locationRouter = require('./routes/location-router');
const usersRouter = require('./routes/usersRouter');
const connectToDatabase = require('./db');

const app = express();

connectToDatabase(); 
console.log('Connected to MongoDB');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/locations', locationRouter);
app.use('/api/users', usersRouter);

// Use routes
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
