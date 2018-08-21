const db = require('../lib/db')
const Sequelize = require('sequelize')
const User = require('./User.model.js')
const Chore = require('./Chore.model.js')

const ChoreCompletion = db.define('chorecompletions', {
  date: {
    type: Sequelize.DATE
  }
})

// userID & choreID need to be set on each completion to link them up
ChoreCompletion.belongsTo(User)
ChoreCompletion.belongsTo(Chore)

module.exports = ChoreCompletion