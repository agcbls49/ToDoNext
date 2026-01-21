// Database Setup
require('dotenv').config();
const mysql = require('mysql2/promise');

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
app.get("/todos/:id", async (req, res) => {
    const todoId = parseInt(req.params.id);

    try {
        const [rows] = await db.query(`SELECT * FROM todos WHERE id = ?`, [todoId]);
        // rows is an array of results
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

    if(!task) return res.status(400).json({message: "Task is required"});

    try {
        // 0 for false and 1 for true
        const isCompleted = completed ? 1 : 0;
        const [result] = await db.query(`INSERT INTO todos (task, tags, completed) VALUES (?, ?, ?)`, [task, tags || "", isCompleted]);
        
        // return the ID of the newly created item
        res.status(201).json({ 
            // auto incremented id
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

// DELETE a todo

// Run this development server in port 
app.listen(process.env.PORT || 4000, () => {
    console.log("Server started on port 4000");
});