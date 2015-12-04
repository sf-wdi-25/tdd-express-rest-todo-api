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

	var getArr = {todos:[]};
	todos.forEach(function (element, index){
		if(element.task == req.query.q){
			getArr.todos.push(todos[index]);
		}
	});
	res.json(getArr);
});

app.get('/api/todos', function index(req, res) {
	res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
	var posts = req.body;
	if(todos.length > 0){
		posts._id = todos[todos.length -1]._id +1;
	}else{
		posts._id =1;
	}
	todos.push(posts);
	res.json(posts);

});

app.get('/api/todos/:id', function show(req, res) {
	var getID = req.params.id;
	res.json(todos[getID -1]);
});

app.put('/api/todos/:id', function update(req, res) {
	todos.forEach(function (element, index){
		var appending = req.body;
		if(element._id == req.params.id){
			todos.splice(index, 1, {_id: element._id, task: appending.task, description: appending.description});
			res.json(todos[index]);
		}
	});

});

app.delete('/api/todos/:id', function destroy(req, res) {
	todos.forEach(function (element, index){
		if(element._id == req.params.id){
			res.json(todos[index]);
			todos.splice(index, 1);
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
