// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/user', function(users) {
    users.forEach(async function (user) {
      const userElStr = await userEl(user)
      $(userElStr).appendTo('ul#users')
    })
  })
  
  $.get('/chore', function(chores) {
    chores.forEach(async function(chore) {
      const choreElStr = await choreEl(chore)
      $(choreElStr).appendTo('ul#chores')
    })
  })
  
  $('#clickForUser1').click((e) => {
    $.get('/userchores/1', (chores) => {
      $('ul#chores').html('')
      chores.forEach(async function(chore) {
        const choreElStr = await choreEl(chore)
        $(choreElStr).appendTo('ul#chores')
      })
    })
  })
  
    $('#clickForUser2').click((e) => {
    $.get('/userchores/2', (chores) => {
      $('ul#chores').html('')
      chores.forEach(async function(chore) {
        const choreElStr = await choreEl(chore)
        $(choreElStr).appendTo('ul#chores')
      })
    })
  })
  
  $.ajax({
    url: '/chore/2',
    type: 'DELETE'
  }).then(res => console.log(res))
  
  /* $.post('/chore', {
    task: "Test adding a new task",
    freq: 5,
    difficulty: 2,
    timeTaken: 5
  }).then((data) => console.log(data)) */

})


const userEl = (user) => {
  return `
    <li>
      ${user.firstName} ${user.lastName}
    </li>
  `
}

async function choreEl (chore) {
  const user = chore.user
  const lastCompleted = await $.get(`/lastchorecompletion/${chore.id}`)
  const points = chore.difficulty * chore.timeTaken
  const diff = Math.floor((new Date() - new Date(lastCompleted)) / (1000 * 60 * 60 * 24))
  let pointsAv = points
  if (!isNaN(diff)) {
    pointsAv = diff < chore.freq + 1 ? points : points - (points * 0.1 * (diff - chore.freq))
    pointsAv = pointsAv > 1 ? pointsAv : 1
  }
  return `
    <li>
      ${chore.task} - every ${chore.freq == 1 ? chore.freq + ' day' : chore.freq + ' days'} - ${points} points - ${user.firstName} - ${lastCompleted ? lastCompleted : "Never"}
      - ${diff}
      - Points avail = ${pointsAv}
      - Is due? ${diff > chore.freq - 2 || isNaN(diff)}
    </li>
  `
}