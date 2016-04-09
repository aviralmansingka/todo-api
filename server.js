var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var todos = [];
var todoNextId = 1
var _ = require('underscore');

app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.send('Todo API root');
});

// GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id : todoId});

	if(matchedTodo) {
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'completed', 'description');
	
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();

	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);

});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id : todoId});

	if (!matchedTodo) {
		res.send(404).json({"error" : "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res){
	var body = _.pick(req.body, 'completed', 'description');
	var validAttributes = {};

	if (body.hasOwnProperty('completed')  && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProeprty('completed')) {
		return response.status(400).send();
	} else {

	}

	if (body.hasOwnProperty('description')  && _.isString(body.description) && body.description.trim().length !== 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return response.status(400).send();
	} else {
		
	}

	// HERE
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id : todoId});
	if (!matchedTodo) {
		return res.status(404).send();
	}
	matchedTodo = _.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
})












