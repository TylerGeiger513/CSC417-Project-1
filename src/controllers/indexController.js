const pages = require('../models/pagesModel');

exports.renderIndex = (req, res) => {
  res.render('layout', { pages });
};

exports.renderPage = (req, res) => {
  const { id } = req.params;

  // Find the requested page by id
  const page = pages.find((p) => p.id === id);

  if (!page) {
    // If the page is not found, respond with a 404 error
    return res.status(404).send('Page not found');
  }

  // Render the corresponding page
  res.render(`pages/${id}`, { navTitle: page.navTitle });
};
