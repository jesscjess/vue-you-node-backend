module.exports = (app) => {
  const projects = require('../controllers/project.controller.js');

  // Create a new Project
  app.post('/projects', projects.create);

  // Retrieve all Projects
  app.get('/projects', projects.findAll);

  // Retrieve a single Project with projectId
  app.get('/projects/:projectId', projects.findOne);

  // Update a Project with projectId
  app.put('/projects/:projectId', projects.update);

  // Delete a Project with projectId
  app.delete('/projects/:projectId', projects.delete);
}