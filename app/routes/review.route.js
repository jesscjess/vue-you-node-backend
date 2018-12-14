module.exports = (app) => {
  const reviews = require('../controllers/review.controller.js');

  // Create a new Review
  app.post('/reviews', reviews.create);

  // Retrieve all Reviews
  app.get('/reviews', reviews.findAll);

  // Retrieve a single Review with reviewId
  app.get('/reviews/:reviewId', reviews.findOne);

  // Update a Review with reviewId
  app.put('/reviews/:reviewId', reviews.update);

  // Delete a Review with reviewId
  app.delete('/reviews/:reviewId', reviews.delete);
}