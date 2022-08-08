const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const dbPath = path.join(__dirname, '../db/todos.json');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'express_practice',
    user: 'root',
    password: ''
});


connection.query('SELECT * FROM todos', (err, data) => {
    if (err) return console.log (err);

    console.log(data);
});


const writeFile = (todo, res) => {
    fs.promises.writeFile(dbPath, JSON.stringify(todo, null, 2))
    .then(() => {
        console.log('Todo updated successfully!')
        res.json(todo);
    }).catch((err) => console.log(err));
};


// read from file db.json
const getTodoData = () => {
    return fs.promises.readFile(dbPath, 'utf8')
        .then(data => JSON.parse(data)); // parse data from json
};


router.get('/todos', (req, res) => {
    connection.query('SELECT * FROM todos', (err, data) => {
        if (err) return console.log (err);
    
        res.json(data);
    });
});


router.post('/todos', (req, res) => {
    connection.query(`INSERT INTO todos SET ?`, req.body, (err, data) => {
        if(err) return console.log(err);

        console.log(data);
    })
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

