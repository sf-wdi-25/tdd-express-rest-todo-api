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
	var toSearch = req.query.q;
	var newArray = [];

	var found; 
	todos.forEach(function (e) {
		if(e.task === toSearch) {
			found = parseInt(todos.indexOf(e));
			newArray.push(todos[found]);
			console.log(newArray);
			
	}
	});

	console.log({todos: newArray});
res.json({todos: newArray});


});

app.get('/api/todos', function index(req, res) {
	 res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
	var todoList= req.body; 
	var task = req.body.task;
	var description = req.body.description; 
	var newId = todos.length + 1;
	todoList = {task: task, description: description, _id: newId};
	if(todos.length>0){
		newId = todos[todos.length - 1]._id + 1;
	} else {
		newId = 1; 
	}
	todos.push(todoList);
	res.json(todoList);

});

app.get('/api/todos/:id', function show(req, res) {
	var getId = req.params.id;
	res.json(todos[getId -1]);
});

app.put('/api/todos/:id', function update(req, res) {
	var id = parseInt(req.params.id);
	var task = req.body.task;
	var description = req.body.description;
	var todosList = { _id: id, task: task, description: description};
	res.json(todosList);


});

app.delete('/api/todos/:id', function destroy(req, res) {
	var getId = parseInt(req.params.id); 
	var found; 
	todos.forEach(function (e) {
		if(e._id === getId) {
			found = todos.indexOf(e);
					}
	});
	var newTodos= todos.splice(found, 1);
	res.json(newTodos);
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
