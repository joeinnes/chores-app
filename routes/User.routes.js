module.exports = (app) => {
    const user = require('../controllers/User.controller.js')

    // Create
    app.post('/user', user.create)
  
    // Read
    app.get('/user', user.findAll)
    app.get('/user/:userId', user.findOne)
  
    // Update
    app.put('/user/:userId', user.update)
  
    // Delete
    app.delete('/user/:userId', user.delete)
}