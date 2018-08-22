const passport = require('./passport-config.js')

module.exports = (app) => {
  app.get('/auth/google',
    passport.authenticate('google', { 
      scope: ['https://www.googleapis.com/auth/plus.login'] 
    })
  )

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/')
    }
  )
  
  app.get('/whoami', 
    function(req, res) {
      res.send(req.user)
    }
  )
  
  app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
  })
}