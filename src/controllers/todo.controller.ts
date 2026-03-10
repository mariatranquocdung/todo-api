import { Request, Response } from "express";
import { Todo } from "../types/todo.type";

let todos: Todo[] = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn TypeScript", completed: true }
];

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "title is required and must be a string"
    });
  }

  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) {
    todo.title = title;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
};

export const deleteTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deletedTodo = todos[index];
  todos.splice(index, 1);

  res.json(deletedTodo);
};