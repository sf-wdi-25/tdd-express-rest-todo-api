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
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' },
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');  
});


/*
 * JSON API Endpoints
 */

// app.get('/api/todos/search', function search(req, res){
//   req.query.q();
// });

app.get('/api/todos', function index(req, res) {
	//res.send('Hello World!');
	res.json({'todos':todos});
});

app.get('/api/todos/:id', function show(req, res) {
  var reqID = req.params.id;
  res.json(todos[reqID-1]);
});

// app.post('/api/todos', function create(req, res) {
//     res.json(todos[2]); // alwayus return homework
// });

// Had a difficult understanding tieing the new array and using req.body.
app.post('/api/todos', function create(req, res) {
    var new_todo = req.body; // {task: 'Walk Dog', description: 'Take Fluffy for a walk'}
    // Put it in the databse + give it a new id
    if(todos.length > 0) {
      new_todo._id = todos[todos.length - 1]._id + 1;
    } else {
        new_todo._id = 1;
  }

  todos.push(new_todo);

  res.json(new_todo);

});

// Had to look at the solutions to get the delete function to work.
app.delete('/api/todos/:id', function destroy(req, res) {
  var todoId = parseInt(req.params.id);

  var todoToDelete = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];

  todos.splice(todos.indexOf(todoToDelete), 1);

  res.json(todoToDelete);
});

// I could quite understand how req.body works when it comes to using put. Had to use look at solutions for this.
app.put('/api/todos/:id', function update(req, res) {
   var todoId = parseInt(req.params.id);

  var todoToUpdate = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];

  todoToUpdate.task = req.body.task;
  todoToUpdate.description = req.body.description;

  res.json(todoToUpdate);
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
