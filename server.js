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

app.get('/api/todos/search', function search(req, res){
	// var search = (req.query.q);
	// var searchToDo = todos.find( function(e) {
	// 	if (search === e.task) {
	// 		console.log(hello);
	// 	}
	// });
});

app.get('/api/todos', function index(req, res) {
	res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
	var newToDo = req.body;
	if (todos.length > 0) {
		newToDo._id = todos[todos.length - 1]._id + 1;
	} else {
		newToDo._id = 1;
	}
	todos.push(newToDo);
	res.send(newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
	var todobyID = parseInt(req.params.id);
	var foundTodo = todos.find( function(e) {
		if(todobyID === e._id) {
			return e;
		}
	});
	res.send(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
	var newTask = req.body.task;
	var newDes = req.body.description;
	var Id = parseInt(req.params.id);
	var update = {_id: Id, task: newTask, description: newDes};
	res.json(update);
});

app.delete('/api/todos/:id', function destroy(req, res) {
	var deleteTodoID = parseInt(req.params.id);
	var newArray = todos.find (function (e, i){
		if (deleteTodoID === e._id) {
			todos.splice(i, 1)
			return todos;
		}
	});
	console.log(todos);
	res.send(newArray);
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
