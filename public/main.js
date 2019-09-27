var update = document.getElementById('edit')
var del = document.getElementById('delete')

update.addEventListener('click', () => {
  console.log('Edit initialized')
  fetch('todos', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'listItem': 'This item has been removed',
      'owner': 'Moderator'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})

del.addEventListener('click', () => {
  console.log('Delete initialized')
  fetch('todos', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'owner': 'Me'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload()
  })
})
