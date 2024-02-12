import cors from "cors";
import express from "express";

let nextId = 2;
let todos = [
  {
    id: 1,
    title: "Add blog post",
    complete: false,
  },
];

const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.json({ type: err.name, message: err.message });
});

app.get("/api/todos", (req, res) => {
  res.json({ todos });
});

app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    res.status(404).end();
    return;
  }

  res.json({ todo });
});

app.post("/api/todos", (req, res) => {
  const todo = {
    id: nextId++,
    title: req.body.title,
    complete: req.body.complete,
  };

  const [valid, errors] = validateTodo(todo);

  if (!valid) {
    res.status(400).json({ message: "The request was not valid", errors });
    return;
  }

  todos.push(todo);

  res.status(201).location(`${baseUrl}/api/todos/${todo.id}`).end();
});

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    res.status(404).end();
    return;
  }

  const updatedTodo = {
    title: req.body.title,
    complete: req.body.complete,
  };

  const [valid, errors] = validateTodo(updatedTodo);

  if (!valid) {
    res.status(400).json({ message: "The request was not valid", errors });
    return;
  }

  todo.title = req.body.title;
  todo.complete = req.body.complete;

  res.status(204).end();
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    res.status(404).end();
    return;
  }

  todos = todos.filter((t) => t !== todo);

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`App is running at ${baseUrl}/`);
});

function validateTodo(todo) {
  const errors = {};

  if (typeof todo.title !== "string" || !todo.title.trim()) {
    errors.title = "Please provide a valid title for the todo";
  }

  if (typeof todo.complete !== "boolean") {
    errors.title =
      "Please specify true if the todo is complete, otherwise false";
  }

  const valid = Object.keys(errors).length === 0;

  return [valid, errors];
}
