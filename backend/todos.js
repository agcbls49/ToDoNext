// Database Setup
require('dotenv').config();
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 4000;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Server Code
const express = require("express");
// CORS setup
const cors = require("cors");
const app = express();

// Enable CORS for React app on port 5173
app.use(cors({
    origin: "http://localhost:5173"
}));

// Middleware
app.use(express.json());

// GET ALL todos (go to localhost:4000/)
app.get("/todos", async(req, res) => {
    try {
        // array of todo objects
        // rows is used for SELECT
        const [rows] = await db.query("SELECT * FROM todos");
        res.json(rows);
    }
    catch (e) {
        console.error(e);
        // Internal Server Error
        res.status(500).json({ error: "Database error" });
    }
});

// GET SINGLE todo (go to localhost:4000/todos/1)
app.get("/todos/:id", async(req, res) => {
    const todoId = parseInt(req.params.id);

    try {
        const [rows] = await db.query(`SELECT * FROM todos WHERE id = ?`, [todoId]);
        if (rows.length === 0) return res.status(404).json({ message: "Todo not found" });
        res.json(rows[0]);
    } 
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database error" });
    }
});

// POST CREATE new todo
app.post("/todos/", async(req, res) => {
    const { task, tags, completed } = req.body;

    // check if its an empty task
    if(!task) return res.status(400).json({ message: "Task is required" });

    try {
        // 0 for false and 1 for true
        const isCompleted = completed ? 1 : 0;
        // result is used for INSERT, UPDATE and DELETE
        const [result] = await db.query(`INSERT INTO todos (task, tags, completed) VALUES (?, ?, ?)`, [task, tags || "", isCompleted]);
        
        // return the ID of the newly created item
        res.status(201).json({ 
            // auto incremented id
            // get the id of the new row the database just created
            id: result.insertId, 
            task, 
            tags, 
            completed: !!isCompleted
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database error" });
    }
});

// UPDATE a todo
app.put("/todos/:id", async(req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, tags, completed } = req.body;

    // check if its an empty task
    if(!task) return res.status(400).json({ message: "Task is required" });

    try {
        const isCompleted = completed ? 1 : 0;
        const [result] = await db.query(`UPDATE todos SET task=?, tags=?, completed=? WHERE id=?`, [task, tags || "", isCompleted, todoId]);

        // affectedRows checks if any row was changed
        // check if the id to update actually exists
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found!" });
        }

        // returns the edited task
        res.status(200).json({ 
            id: todoId, 
            task, 
            tags, 
            completed
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database error" });
    }
});

// DELETE a todo
app.delete("/todos/:id", async(req, res) => {
    const todoId = parseInt(req.params.id);

    try {
        const [result] = await db.query(`DELETE FROM todos WHERE id=?`, [todoId]);

        // prevent user from deleting a non-existent id task
        // confirm if something was actually deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found!" });
        }

        res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database error" });
    }
});

// Run this development server in port 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/todos`);
});