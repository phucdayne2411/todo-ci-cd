const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("todo.db");

db.run("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY, title TEXT)");

app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todo", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/todos", (req, res) => {
  db.run("INSERT INTO todo (title) VALUES (?)", [req.body.title]);
  res.send("OK");
});

app.listen(3000, () => console.log("Server running at 3000"));
