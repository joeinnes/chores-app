module.exports = (app) => {
    const chorecompletion = require('../controllers/ChoreCompletion.controller.js')

    // Create
    app.post('/chorecompletion', chorecompletion.create)
  
    // Read
    app.get('/chorecompletion', chorecompletion.findAll)
    app.get('/chorecompletion/:chorecompletionId', chorecompletion.findOne)
    app.get('/lastchorecompletion/:choreId', chorecompletion.findLast)
  
    // Update
    app.put('/chorecompletion/:chorecompletionId', chorecompletion.update)
  
    // Delete
    app.delete('/chorecompletion/:chorecompletionId', chorecompletion.delete)
}