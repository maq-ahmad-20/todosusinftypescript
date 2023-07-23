import {Router} from 'express';

import {Todo} from '../models/todos'

const router = Router();

const todos :Todo[] = [];

router.get('/' ,(req,res,next)=>{
    res.status(200).json({todos : todos})
} )

router.post('/todo' , (req,res,next)=>{
    const newTodo : Todo ={
        id : new Date().toISOString(),
        text : req.body
    }
       todos.push(newTodo)
    res.status(200).json({success : true , todos : newTodo})
})

router.post('/delete/:id' , (req,res,next)=>{
    const toDoIndes = todos.findIndex(todo => todo.id === req.params.id)
    if(toDoIndes >=0){
          todos.splice(toDoIndes ,1)
          res.status(200).json({success : true})
    }else{
        res.status(401).json({message : "Not valid id for to do"})
    }
})

router.post('/edit/:id' , (req,res,next)=>{
    const toDoindex = todos.findIndex(todo => todo.id === req.params.id)
    const updatedTodo : Todo = {
        id : req.params.id,
        text : req.body
    }
    if(toDoindex >=0){
     todos[toDoindex] = updatedTodo
    res.status(200).json({success : true})
    }else{
        res.status(404).json({Message : "Not valid id for to do. Item not found "})
    }
})

router.get('/getAlltodo', (req,res,next)=>{
       res.json(200).json({allTodo : todos})
})

export default router