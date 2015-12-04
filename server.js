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
	var newsearch = req.query.q;
	var filterTodo;
	var found;
	todos.forEach(function(ele) {
		if(ele.task === newsearch) {
			found = todos.indexOf(ele);
			filterTodo = todos.splice(found, 1);
			todos.push(ele);
			console.log(filterTodo);
		} else {
			console.log("dud");
		}
	})
	res.json({todos: filterTodo});
});

app.get('/api/todos', function index(req, res) {
	res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
	var newtodo;
	var newid;
	if( todos.length > 0) {
		newid = todos[todos.length - 1]._id + 1
	} else {
		newid = 1;
	}
	var newtask = req.body.task;
	var newdescription = req.body.description;
	newtodo = { _id: newid, task: newtask, description: newdescription}
	todos.push(newtodo);
	res.json(newtodo);
});

app.get('/api/todos/:id', function show(req, res) {
	var idReq = req.params.id;
	var found;
	todos.forEach(function(ele) {
		if(ele._id == idReq) {
			found = todos.indexOf(ele);
			console.log(found);
		} else {
			console.log("dud")
		}
	})
	res.json(todos[found]);
});

app.put('/api/todos/:id', function update(req, res) {
	var idReq = parseInt(req.params.id);
	var newtask = req.body.task;
	var newdescription = req.body.description;
	var updateTodo = { _id: idReq, task: newtask, description: newdescription};
	res.json(updateTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
	var idReq = parseInt(req.params.id);
	var found;
	todos.forEach(function(ele) {
		if(ele._id === idReq) {
			found = todos.indexOf(ele);
		} else {
			console.log("dud");
		}
	})
	var newTodos = todos.splice(found, 1);
	res.json(newTodos);
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
