const ChoreCompletion = require('../models/ChoreCompletion.model.js')
const Sequelize = require('sequelize')

// Create and Save a new User
exports.create = (req, res) => {
  // Chore.create({ firstName: req.query.fName, lastName: req.query.lName})
  res.sendStatus(202)
}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  var dbChoreCompletions = []
  ChoreCompletion.findAll().then((chorecompletions) => { // find all entries in the users tables
    chorecompletions.forEach((chorecompletion) => {
      dbChoreCompletions.push(chorecompletion) // adds their info to the dbUsers value
    })
    res.send(dbChoreCompletions) // sends dbUsers back to the page
  })
}

exports.findByUser = (req, res) => {
  var dbChoreCompletions = []
  ChoreCompletion.findAll({
    where: {
      userId: req.params.userId
    }
  }).then((chorecompletions) => {
    chorecompletions.forEach((chorecompletion) => {
      dbChoreCompletions.push(chorecompletion)
    })
    res.send(dbChoreCompletions)
  })
}

exports.findLast = (req, res) => {
  ChoreCompletion.max('date', {
    where: {
      choreId: req.params.choreId
    }
  }).then((chorecompletion) => {
    res.send(chorecompletion)
  })
}

// Find a single user with a userId
exports.findOne = (req, res) => {

}

// Update a user identified by the userId in the request
exports.update = (req, res) => {

}

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

}