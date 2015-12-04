// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', function searchpage (req, res) {
  res.sendFile(__dirname + '/views/search.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/todos/search', function search(req, res){
  var data = {todos: []};
  todos.forEach(function (ele, index) {
    if(ele.task == req.query.q) {
      data.todos.push(todos[index]);
      res.json(data);
    }
  });
  res.send({todos: [{task:"No data!"}]});
});

app.get('/api/todos', function index(req, res) {
  var data = {todos: todos};
  res.json(data);
});

app.get('/api/todos/:id', function show(req, res) {
  var data;
  todos.forEach(function (ele, index) {
    if(ele._id == req.params.id) {
      data = todos[index];
    }
  });
  res.json(data);
});

app.post('/api/todos', function create(req, res) {
  var data = req.body;
  data._id = 0;
  todos.forEach(function (ele, index) {
    data._id = ele._id >= data._id ? ele._id+1 : data._id;
  });
  todos.push(data);
  res.json(data);
});

app.put('/api/todos/:id', function update(req, res) {
  var data = req.body;
  todos.forEach(function (ele, index) {
    if(ele.task == data.task) {
      todos[index].task = data.task;
      todos[index].description = data.description;
      res.json(todos[index]);
    }
  });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var data;
  todos.find(function (ele, index) {
    if(ele._id == req.params.id) {
      data = todos[index];
      todos.splice(index, 1);
      res.json(data);
    }
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
