import express from "express";

const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;

let nextId = 2;
let todos = [
  {
    id: 1,
    title: "Add blog post",
    complete: false,
  },
];

app.use(express.json());

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
