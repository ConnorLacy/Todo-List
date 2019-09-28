var recordDescriptions = document.querySelectorAll('.todo-item .details .description')
if(recordDescriptions){
  recordDescriptions.forEach(function (el) {
    el.addEventListener('focusout', updateRecord, false);
  })
}

function updateRecord(e){
  var updatedDescription = e.currentTarget.innerText
  console.log(updatedDescription)
  var noteID = e.currentTarget.parentElement.parentElement.getAttribute("value")
  fetch('todos', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      '_id': noteID,
      'listItem': updatedDescription
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}

var delButtons = document.querySelectorAll('.todo-item .delete')
if(delButtons){
  delButtons.forEach(function(el) {
    el.addEventListener('click', onClick, false);
  })
}

function onClick(e){
  var x = e.currentTarget;
  var noteID = x.querySelector('.noteID').innerText

  console.log(`Deleting todo with id: ${noteID}`)
  fetch('todos', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': noteID
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload()
  })
}
