const db = require('../lib/db')
const Sequelize = require('sequelize')

const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = User