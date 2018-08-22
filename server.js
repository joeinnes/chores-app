// server.js
// where your node app starts

// Get dependencies
const express = require('express')
const session = require("express-session")
const app = express()
const busboy = require('express-busboy')
const passport = require('./lib/passport-config.js')

// DEV
const setup = require('./dev/bootstrap')

// Configure middleware
busboy.extend(app)
app.use(express.static("public"))
app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(passport.initialize())
app.use(passport.session())

// Configure routes
require('./routes/User.routes.js')(app)
require('./routes/Chore.routes.js')(app)
require('./routes/ChoreCompletion.routes.js')(app)
require('./lib/passport-routes.js')(app)


// Configure failover route
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

setup()