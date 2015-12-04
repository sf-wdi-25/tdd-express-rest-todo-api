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


/*
 * JSON API Endpoints
 */

app.get('/api/todos/search', function search(req, res){});


app.get('/api/todos', function index(req, res) {
	res.json({todos: todos});
});

// Copied entirely from website, but at least I *do* get this step
app.post('/api/todos', function create(req, res) {
  var newTodo = req.body;

  if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
  } else {
    newTodo._id = 1;
  }

  todos.push(newTodo);

  res.json(newTodo);
});


app.get('/api/todos/:id', function show (req, res) {
	var wantedID = req.params.id;
	res.json(todos[wantedID -1]);
});


// ALTERNATE SOLUTION from https://github.com/sf-wdi-25/notes/tree/master/week-03-ajax-json-express
// 	/day-04-json-api/dawn-create-read
// app.get('/api/todos/:id', function show(req, res) {
//    var todoId = parseInt(req.params.id);

//    var foundTodo = todos.filter(function (todo) {
//    return todo._id === todoId;
//    })[0];

//  res.json(foundTodo);
// });


app.put('/api/todos/:id', function update(req, res) {});


app.delete('/api/todos/:id', function destroy(req, res) {
	var todoId = parseInt(req.params.id);

	var todoToDelete = todos.filter(function (todo) {
	    return todo._id === todoId;
	})[0];

	todos.splice(todos.indexOf(todoToDelete), 1);

	res.json(todoToDelete);
});




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
