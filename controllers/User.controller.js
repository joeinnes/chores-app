const User = require('../models/User.model.js');

// Create and Save a new User
exports.create = (req, res) => {
  User.create({ firstName: req.query.fName, lastName: req.query.lName})
  .then(data => {
    res.sendStatus(200)
  })
  .catch(e => res.status(500).send(e))
}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  var dbUsers = []
  User.findAll().then((users) => { // find all entries in the users tables
    users.forEach((user) => {
      dbUsers.push(user) // adds their info to the dbUsers value
    })
    res.send(dbUsers) // sends dbUsers back to the page
  })
  .catch(e => res.status(500).send(e))
}

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send(user)
    })
    .catch(e => res.status(500).send(e))
}

// Update a user identified by the userId in the request
exports.update = (req, res) => {

}

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

}