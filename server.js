//Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db
var ObjectId = require('mongodb').ObjectId

//App connection and port opening
//Here we're connecting to the MongoDB database. If a connection error occurs it will break
//and return the error description. Otherwise, it will open the application on port 3000 with
//a connection to our database
MongoClient.connect('mongodb+srv://site-owner:vanillajsEXITE33@todo-list-ifddo.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if(err) return console.log(err)
  db = client.db('Todo-List')
  app.listen(3000, () => {
    console.log('listening on port:3000')
  })
})

//Connect styles folder to application
app.use('/css', express.static('css'))
//Connect public folder to application
app.use('/public', express.static('public'))

//Bodyparser is used to read data from <form> elements. Express is the utility which
//allows us to employ packages like bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//In order to pull data from MongoDB and format it to HTMl without using dynamic rendering
//frameworks like React/Angular, in this case we will be using EJS. EJS is a form engine that will
//help us inject data into the HTML
app.set('view engine', 'ejs')


//Handle GET request
//Get request will retrieve information from our database (MongoDB)
app.get('/', (req, res) => {
  db.collection('todos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {todos: result})
  })
})

//Handle POST request
// Post request allows a client to post information to the database. A collection is a named location
// to store things by category. Todos, Chores, Bills, etc.
app.post('/todos', (req, res) => {
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Saved Todo to database')
    res.redirect('/')
  })
})

app.put('/todos', (req, res) => {
  console.log(`Attempting to update record ${req.body._id} with description: ${req.body.listItem}`)
  db.collection('todos').findOneAndUpdate(
    //query
    {"_id": ObjectId(req.body._id)},
    //update
    { $set: {"listItem": req.body.listItem}},
    //options
    {returnNewDocument: true},
    (err, result) => {
      if (err) return result.send(err)
      res.send(result)
    })
})

app.delete('/todos', (req, res) => {
  db.collection('todos').deleteOne(
    //query
    {"_id": ObjectId(req.body._id)},
    //callback
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'Deleted Todo'})
    })
})
