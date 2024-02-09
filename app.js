import express from "express";

const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;

app.get("/api/todos", (req, res) => {
  res.json({ message: "Get all todos" });
});

app.get("/api/todos/:id", (req, res) => {
  res.json({ message: "Get a todo by id" });
});

app.post("/api/todos", (req, res) => {
  const id = 1;

  res.status(201).location(`${baseUrl}/api/todos/${id}`);
  res.json({ message: "Add a todo" });
});

app.put("/api/todos/:id", (req, res) => {
  res.status(204).json({ message: "Update a todo by id" });
});

app.delete("/api/todos/:id", (req, res) => {
  res.status(204).json({ message: "Delete a todo by id" });
});

app.listen(port, () => {
  console.log(`App is running at ${baseUrl}/`);
});
