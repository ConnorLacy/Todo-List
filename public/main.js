var update = document.getElementById('edit')

update.addEventListener('click', function() {
  console.log('Click was heard')
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
