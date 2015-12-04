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

var trash = [];
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

app.post('/api/todos', function create(req, res) {

	var newTodo = {};
	newTodo.task = req.body.task;
	newTodo.description = req.body.description;
	newTodo._id = (todos.length + 1);
	todos.push(newTodo);
	res.send(newTodo);

});

app.get('/api/todos/:id', function show(req, res) {
		//res.json({todos: todos});
	var id =  parseInt(req.params.id);
	//console.log("Looking for object with id: _" + id);
	//find the element in todos with the _id === id
	todos.forEach(function(element) {
		if (element._id === id){
			res.send(element);
		}
	});
});

app.put('/api/todos/:id', function update(req, res) {
	var id =  parseInt(req.params.id);
	todos.forEach(function(element, index) {
		if (element._id === id) {
			element.task = req.body.task;
			element.description = req.body.description;
			res.send(element);
		}
	});

});

app.delete('/api/todos/:id', function destroy(req, res) {
	var id =  parseInt(req.params.id);

	todos.forEach(function(element, index) {
		if (element._id === id) {
			todos.splice(index, 1);
		}
	});
	res.json({}); // empty object
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
