const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/User.model.js')

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://${process.env.BASE_URL}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      where: { 
        googleId: profile.id
      }, 
      defaults: {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value || null
      }
    }).spread((results, metadata) => done(null, results))
      .catch(e => done(e, null))
  }
))

passport.serializeUser(function(user, done) {
  console.log(user.id)
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => done(null, user))
  .catch(e => done(e, null))
})

module.exports = passport