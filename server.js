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

var id = todos._id;
var task = todos.task;
var description = todos.description;

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var id = todos._id;
/*
 * JSON API Endpoints
 */

app.get('/api/todos/search', function search(req, res){});

app.get('/api/todos', function index(req, res) {
	// res.send('hello world');
	res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
	var newTodo = req.body;


	if (todos.length > 0) {
		newTodo._id = todos[todos.length - 1]._id + 1;
	}
	else {
		newTodo._id = 1;
	}

	todos.push(newTodo);

	res.json(newTodo);
	
});

app.get('/api/todos/:id', function show(req, res) {
	var todoId = parseInt(req.params.id);
	console.log("the value of `id` is...", todoId);
	var foundTodo = todos.filter(function (todo){
		return todo._id == todoId;
	})[0];
	res.json(foundTodo);

	
});

app.put('/api/todos/:id', function update(req, res) {
	var todoId = parseInt(req.params.id);
	var todoToUpdate = todos.filter(function (todo){
		return todo._id == todoId;
	})[0];

	todoToUpdate.task = req.body.task;
	todoToUpdate.description = req.body.description;

	res.json(todoToUpdate);
	



});

app.delete('/api/todos/:id', function destroy(req, res) {
	var todoId = parseInt(req.params.id);
	var todoToDelete = todos.filter(function (todo){
		return todo._id == todoId;
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
