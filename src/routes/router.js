const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Route for the index page
router.get('/', indexController.renderIndex);

// Route for individual carousel pages
router.get('/pages/:id', indexController.renderPage);

module.exports = router;
