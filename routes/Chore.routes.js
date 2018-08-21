module.exports = (app) => {
    const chore = require('../controllers/Chore.controller.js')

    // Create
    app.post('/chore', chore.create)
  
    // Read
    app.get('/chore', chore.findAll)
    app.get('/chore/:choreId', chore.findOne)
    app.get('/userchores/:userId', chore.findByUser)
  
    // Update
    app.put('/chore/:choreId', chore.update)
  
    // Delete
    app.delete('/chore/:choreId', chore.delete)
}