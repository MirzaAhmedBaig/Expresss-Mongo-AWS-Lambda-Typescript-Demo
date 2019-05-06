import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import db from '../utils/raw';

export const router = express.Router();

router.get('/api/v1/todos', (req: Request, res: Response) => {
    res.status(200).send({
        success: 'true',
        message: "todos retived successfully.",
        todos: db
    });
});

router.post('/api/v1/todos', (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    if (!data.title) {
        return sendErrorMessage(res, "Title cannot be empty", 400);
    } else if (!data.description) {
        return sendErrorMessage(res, "Description cannot be empty", 400);
    }

    const newEntry = {
        id: db.length + 1,
        title: data.title,
        description: data.description
    };
    db.push(newEntry);
    res.status(200).send({
        success: 'true',
        message: 'todo added succesfully',
        todos: newEntry
    });
});

router.post('/api/v1/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    db.map((todo) => {
        if (todo.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Todo found successfully',
                todo: todo
            });
        }
    });

    sendErrorMessage(res, "Todo does not exist", 404);
});


router.delete('/api/v1/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'deleted todo successfully'
            });
        }
    });
    sendErrorMessage(res, "Todo does not exist", 404);
})

router.put('/api/v1/todos/:id', (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    if (!data.title) {
        return sendErrorMessage(res, "Title cannot be empty", 400);
    } else if (!data.description) {
        return sendErrorMessage(res, "Description cannot be empty", 400);
    }
    const id = parseInt(req.params.id);
    db.map((todo) => {
        if (todo.id === id) {
            todo.title = data.title;
            todo.description = data.description;
            return res.status(200).send({
                success: 'true',
                message: 'updated todo successfully',
                todo: todo
            });
        }
    })

    sendErrorMessage(res, "Todo does not exist", 404);
})

function sendErrorMessage(res: Response, message: String, code: number) {
    res.status(code).send({
        success: 'false',
        message: message
    });
};