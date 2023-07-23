"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ success: true, todos: newTodo });
});
router.post('/delete/:id', (req, res, next) => {
    const params = req.params;
    const toDoIndes = todos.findIndex(todo => todo.id === params.id);
    if (toDoIndes >= 0) {
        todos.splice(toDoIndes, 1);
        res.status(200).json({ success: true });
    }
    else {
        res.status(401).json({ message: "Not valid id for to do" });
    }
});
router.post('/edit/:id', (req, res, next) => {
    const params = req.params;
    const toDoindex = todos.findIndex(todo => todo.id === params.id);
    const body = req.body;
    const updatedTodo = {
        id: params.id,
        text: body.text
    };
    if (toDoindex >= 0) {
        todos[toDoindex] = updatedTodo;
        res.status(200).json({ success: true });
    }
    else {
        res.status(404).json({ Message: "Not valid id for to do. Item not found " });
    }
});
router.get('/getAlltodo', (req, res, next) => {
    return res.json(200).json({ allTodo: todos });
});
exports.default = router;
