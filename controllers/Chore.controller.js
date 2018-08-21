const Chore = require('../models/Chore.model.js')
const User = require('../models/User.model.js')

exports.create = (req, res) => {
  Chore.create({
    task: req.body.task,
    freq: parseInt(req.body.freq, 10),
    difficulty: parseInt(req.body.difficulty, 10),
    timeTaken: parseInt(req.body.timeTaken, 10),
    userId: parseInt(req.body.userId, 10) || null
  }).then((data) => res.json(data))
    .catch(e => res.status(500).send(e))
}

exports.findAll = (req, res) => {
  let dbChores = []
  Chore.findAll({ 
    include: [User] 
  }).then((chores) => { // find all entries in the users tables
    chores.forEach((chore) => {
      dbChores.push(chore) // adds their info to the dbUsers value
    })
    if (dbChores.length == 0) {
      res.status(204).send()
    }
    res.send(dbChores) // sends dbUsers back to the page
  })
    .catch(e => res.status(500).send(e))
}

exports.findByUser = (req, res) => {
  let dbChores = []
  Chore.findAll({
    where: {
      userId: req.params.userId
    },
    include: [User]
  }).then((chores) => {
    chores.forEach((chore) => {
      dbChores.push(chore)
    })
    if (dbChores.length == 0) {
      res.status(204).send()
    }
    res.send(dbChores)
  })
    .catch(e => res.status(500).send(e))
}

exports.findOne = (req, res) => {
  Chore.findById(req.params.choreId)
    .then(chore => {
      if (!chore) {
        res.status(204).send()
      }
      res.send(chore)
    })
    .catch(e => res.status(500).send(e))
}

exports.update = (req, res) => {
  Chore.update({
    task: req.body.task,
    freq: parseInt(req.body.freq, 10),
    difficulty: parseInt(req.body.difficulty, 10),
    timeTaken: parseInt(req.body.timeTaken, 10),
    userId: parseInt(req.body.userId, 10) || null
  }, {
    where: {
      _id: req.params.choreId
    }
  })
  .catch(e => res.status(500).send(e))
}

exports.delete = (req, res) => {
  Chore.destroy({
    where: {
      id: req.params.choreId
    }
  })
  .catch(e => res.status(500).send(e))
}