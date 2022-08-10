const todo_router = require('express').Router();
const db = require('../db/connection');


// Get All Todos
// localhost:3333/api/todos
todo_router.get('/todos', (request, response) => {
  db.query('SELECT * FROM todos', (err, data) => {
    if (err) return console.log(err);

    response.json(data);
  });
});

// Create Todo
todo_router.post('/todos', (request, response) => {
  db.query(`INSERT INTO todos SET ?`, request.body, (err, data) => {
    if (err) return console.log(err);

    response.json({
      id: data.insertId,
      message: 'Todo added successfully!'
    });
  });
});

// localhost:3333/api/todos - DELETE request
todo_router.delete('/todos', (request, response) => {
  const id = request.body.id;

  db.query('DELETE FROM todos WHERE id = ?', id, (err, info) => {
    if (err) return console.log(err);

    response.json({
      message: `Todo with id of ${id} has been deleted successfully.`
    });
  })
});


module.exports = todo_router;