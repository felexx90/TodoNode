const Todo = require('../models/todo.model');
const mongoose= require('mongoose');

function saveTodo(req, res) {
    Todo.create(req.body).then((todo) => {
        res.json({success: 1, description: "Todo created"});
        console.log('Todo created: ',todo)
    }).catch((err) => {
        console.log('Error save Todo', err);
        res.status(204).send();
    })
}

function updateTodo(req, res) {
    Todo.update({_id: new mongoose.Types.ObjectId(req.swagger.params.id.value)}, {$set: req.body}).then((todo) => {
        console.log('Updated created: ',todo);
        res.json({success: 1, description: "Todo updated!"});
    }).catch((err) => {
        console.log('Error update Todo', err);
        res.status(204).send();
    });
}

function deleteTodo(req, res) {
    Todo.deleteOne({_id: req.swagger.params.id.value}).then(() => {
        res.json({success: 1, description: "Todo deleted!"});
    }).catch((err) => {
        console.log('Error delete Todo', err);
        res.status(204).send();
    })

}

function getTodos(req, res) {
    if (req.swagger.params.all.value) {
        Todo.find().then((todos) => {
            res.status(200).json({todos});
        })
    }else{
        Todo.find({completed:false}).then((todos) => {
            res.status(200).json({todos});
        })
    }
}

function getTodo(req, res) {
    let id = req.swagger.params.id.value;
    Todo.findById(id).then((todo) => {
        res.status(200).json(todo);
    })
}

module.exports = {saveTodo, updateTodo, deleteTodo, getTodos, getTodo};