//Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db

//App connection and port opening
//Here we're connecting to the MongoDB database. If a connection error occurs it will break
//and return the error description. Otherwise, it will open the application on port 3000 with
//a connection to our database
MongoClient.connect('mongodb+srv://<db-user>:<password>@todo-list-ifddo.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if(err) return console.log(err)
  db = client.db('Todo-List')
  app.listen(3000, () => {
    console.log('listening on port:3000')
  })
})

//Connect styles folder to application
app.use('/css', express.static('css'))

//Bodyparser is used to read data from <form> elements. Express is the utility which
//allows us to employ packages like bodyParser
app.use(bodyParser.urlencoded({extended: true}))

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
