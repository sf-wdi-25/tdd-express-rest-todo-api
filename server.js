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
	res.json({"todos": todos});
});

app.get('/api/todos/:id', function show(req, res) {
	todos.forEach(function (element, index) {
		if (element._id == req.params.id) {
			res.json(todos[index]);
		}
	});
});

app.post('/api/todos', function create(req, res) {
	var previous_id = todos[todos.length-1]._id;
	var data = {_id: previous_id + 1, task: 'Walk Dog', description: 'Take Fluffy for a walk'};
	res.json(data);
	todos[todos.length] = data;
});

app.del('/api/todos/:id', function destroy(req, res) {});

app.put('/api/todos/:id', function update(req, res) {});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
