const Project = require('../models/project.model.js');

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: "Project content can not be empty"
    });
  }

  if(!req.title.content) {
    return res.status(400).send({
      message: "Project title can not be empty"
    });
  }

  // Create a Project
  const project = new Project({
      title: req.body.title || "Untitled Project", 
      content: req.body.content,
      url: req.body.url
  });

  // Save Project in the database
  project.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Project."
      });
  });
};

// Retrieve and return all projects from the database.
exports.findAll = (req, res) => {
  Project.find()
  .then(projects => {
      res.send(projects);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving projects."
      });
  });
};

// Find a single project with a projectId
exports.findOne = (req, res) => {
  Project.findById(req.params.projectId)
  .then(project => {
      if(!project) {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });            
      }
      res.send(project);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving project with id " + req.params.projectId
      });
  });
};

// Update a project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.content) {
      return res.status(400).send({
          message: "Project content can not be empty"
      });
  }

  if(!req.body.title) {
    return res.status(400).send({
        message: "Project title can not be empty"
    });
  }

  // Find project and update it with the request body
  Project.findByIdAndUpdate(req.params.projectId, {
      title: req.body.title,
      url: req.body.url,
      content: req.body.content
  }, {new: true})
  .then(project => {
      if(!project) {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });
      }
      res.send(project);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });                
      }
      return res.status(500).send({
          message: "Error updating project with id " + req.params.projectId
      });
  });
};

// Delete a project with the specified projectId in the request
exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params.projectId)
  .then(project => {
      if(!project) {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });
      }
      res.send({message: "Project deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Project not found with id " + req.params.projectId
          });                
      }
      return res.status(500).send({
          message: "Could not delete project with id " + req.params.projectId
      });
  });
};