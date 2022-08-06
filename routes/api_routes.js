const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/todos.json');

const writeFile = (todo, res) => {
    fs.promises.writeFile(dbPath, JSON.stringify(todo, null, 2))
    .then(() => {
        console.log('Todo updated successfully!')
        res.json(todo);
    }).catch((err) => console.log(err));
};


const getTodoData = () => {
    return fs.promises.readFile(dbPath, 'utf8')
        .then(data => JSON.parse(data));
};


router.get('/todos', (req, res) => {
    getTodoData()
        .then(todo_data => {
            res.json(todo_data);
        }).catch(err => {
            if (err) return console.log(err);
        });

});


router.post('/todos', (req, res) => {
    getTodoData()
        .then(todo_data => {
            const new_todo_data = req.body;

            const refId = todo_data.length ? todo_data[todo_data.length - 1].id : 0;

            new_todo_data.id = refId + 1;

            todo_data.push(new_todo_data);

            writeFile(todo_data, res);

        });
});


router.delete('/todos', (req, res) => {
    getTodoData()
        .then(todos => {
            const id = req.body.id;
            const obj = todos.find(todo => todo.id === id);
            const index = todos.indexOf(obj);

            todos.splice(index, 1);

            writeFile(todos, res);
        });
});

module.exports = router;

