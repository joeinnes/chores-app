// server.js
// where your node app starts

// init project
const express = require('express')

const app = express()
const busboy = require('express-busboy')

busboy.extend(app)

// default user list
const users = [
      ["Joe","Innes"],
      ["Ada","Tar"],
    ]

const chores = [
  {
    task: "Test task 1",
    freq: 2,
    difficulty: 3,
    timeTaken: 10,
    userId: 1
  },
  {
    task: "Test task 2",
    freq: 3,
    difficulty: 5,
    timeTaken: 5,
    userId: 1
  },
  {
    task: "Test task 3",
    freq: 3,
    difficulty: 1,
    timeTaken: 5,
    userId: 2
  },
]

const chorecompletions = [
  {
    choreId: 1,
    userId: 2,
    date: new Date(2018,7,12)
  },
  {
    choreId: 1,
    userId: 2,
    date: new Date(2018,5,12)
  },
  {
    choreId: 2,
    userId: 2,
    date: new Date(2018,7,21)
  }
]

require('./routes/User.routes.js')(app)
require('./routes/Chore.routes.js')(app)
require('./routes/ChoreCompletion.routes.js')(app)

const User = require('./models/User.model.js')
const Chore = require('./models/Chore.model.js')
const ChoreCompletion = require('./models/ChoreCompletion.model.js')

// setup a new database
// using database credentials set in .env
// populate table with default users
function setup(){
  User.sync({force: true}) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
    .then(function(){
      // Add the default users to the database
      for(var i=0; i<users.length; i++){ // loop through all users
        User.create({ firstName: users[i][0], lastName: users[i][1]}) // create a new entry in the users table
      }
    })
  Chore.sync({force: true})
    .then(function(){
      for (const chore of chores) {
        Chore.create(chore)
      }
    })
  ChoreCompletion.sync({force: true})
    .then(function(){
      for (const chorecompletion of chorecompletions) {
        ChoreCompletion.create(chorecompletion)
      }
    })
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

// drops the table users if it already exists, populates new users table it with just the default users.
app.get("/reset", function (request, response) {
  setup()
  response.redirect("/")
})

// removes all entries from the users table
app.get("/clear", function (request, response) {
  User.destroy({where: {}})
  response.redirect("/")
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

setup()