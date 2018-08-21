const db = require('../lib/db')
const Sequelize = require('sequelize')
const User = require('./User.model.js')

const Chore = db.define('chores', {
  task: {
    type: Sequelize.STRING
  },
  freq: {
    type: Sequelize.INTEGER
  },
  difficulty: {
    type: Sequelize.INTEGER
  },
  timeTaken: {
    type: Sequelize.INTEGER
  }
})

// userID needs to be set on each Chore to link them up
Chore.belongsTo(User)

module.exports = Chore