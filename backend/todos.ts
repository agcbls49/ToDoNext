// Database Setup
import dotenv from 'dotenv';
import mysql, { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// Load environment variables for database
dotenv.config();

/* 
    10 is a radix or base, parses the string value into an integer
    used to ensure the port is always read correctly as a standard number
    necessary network-related APIs usually require a numeric port value, 
    while environment variables are always strings 
*/
const PORT: number = parseInt(process.env.PORT || '4000', 10);

// Interface Object for the Todo in the database
interface Todo {
    id: number;
    task: string;
    tags: string;
    completed: number; // 0 or 1 in database
}

// Interface Object of todo that is sent back to the Frontend
interface TodoResponse {
    id: number;
    task: string;
    tags: string;
    completed: boolean; // front end version
}

// Interface for Database Config Setup
interface DatabaseConfig {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
    waitForConnections: boolean;
    connectionLimit: number;
    queueLimit: number;
}

const dbConfig: DatabaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    /* 
        maximum number of connections the server will open at once
        an 11th person to connect will have to wait 
        (hence waitforconenctions: true) since 10 is the limit 
    */
    connectionLimit: 10,
    /* 
        how many people can wait in line = 0 meaning no limit to the 
        length of the line and everyone waits until a connection opens 
    */
    queueLimit: 0
};

/* 
    Pool keeps database connections open so it can be reused by others
    https://stackoverflow.com/a/4041163
*/
const db: Pool = mysql.createPool(dbConfig);

// Server Setup
const app: Application = express();

// Enable CORS for NextJS app on port 3000
app.use(cors({
    origin: "http://localhost:3000"
}));

// Built-in Express middleware to parse incoming JSON request bodies
app.use(express.json());

// GET ALL todos (go to localhost:4000/)
app.get("/todos", async (req: Request, res: Response): Promise<void> => {
    try {
        /* 
            variable rows is used for SELECT
            RowDataPacket represents a single row of 
            data returned from a database query 
        */
        const [rows] = await db.query<(RowDataPacket & Todo)[]>("SELECT * FROM todos");
        
        // Convert the raw database rows into the TodoResponse format for the frontend
        const todos: TodoResponse[] = rows.map((row: RowDataPacket & Todo) => ({
            id: row.id,
            task: row.task,
            tags: row.tags,
            // convert MySQL integers(0 & 1) into booleans(true & false) for the frontend
            completed: Boolean(row.completed)
        }));

        res.json(todos);
    } 
    catch (e: any) 
    {
        console.error(e);
        // Internal Server Error
        res.status(500).json({ error: "Database Error" });
    }
});

// GET SINGLE todo (go to localhost:4000/todos/1)
app.get("/todos/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);

    try {
        // ? is a placeholder to prevent SQL Injection
        const [rows] = await db.query<(RowDataPacket & Todo)[]>(
            "SELECT * FROM todos WHERE id = ?",[todoId]);
    
        // if array is empty then the ID does not exist in the table
        if (rows.length === 0) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
    
        // convert the result into the TodoResponse format for the frontend
        const todo: TodoResponse = {
            // [0] just gets the first item
            id: rows[0].id,
            task: rows[0].task,
            tags: rows[0].tags,
            completed: Boolean(rows[0].completed)
        };

        res.json(todo);
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// POST CREATE new todo
app.post("/todos/", async (req: Request, res: Response): Promise<void> => {
    // ? is used to check if undefined or missing
    const { task, tags, completed }: { task?: string; tags?: string; completed?: boolean } = req.body;

    // check if its an empty task
    if (!task) {
        res.status(400).json({ message: "Task is required" });
        return;
    }

    try {
        // 0 for false and 1 for true
        const isCompleted: number = completed ? 1 : 0;

        /* 
            variable result is used for INSERT, UPDATE and DELETE
            ResultSetHeader defines the structure of metadata returned 
            from non-SELECT queries including affectedRows & insertId 
        */
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO todos (task, tags, completed) VALUES (?, ?, ?)",
            [task, tags || "", isCompleted]
        );
    
        // return the ID of the newly created item
        res.status(201).json({ 
            /* 
                database auto increments the id
                get the id of the new row the database just created 
            */
            id: result.insertId, 
            task, 
            tags: tags || "",
            // !! returns a strict boolean for the frontend
            completed: !!isCompleted
        });
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// UPDATE a todo
app.put("/todos/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);
    const { task, tags, completed }: { task?: string; tags?: string; completed?: boolean } = req.body;

    // check if its an empty task
    if (!task) {
        res.status(400).json({ message: "Task is required" });
        return;
    }

    try {
        const isCompleted: number = completed ? 1 : 0;

        const [result] = await db.query<ResultSetHeader>(
            "UPDATE todos SET task=?, tags=?, completed=? WHERE id=?",
            [task, tags || "", isCompleted, todoId]
        );

        /*
            affectedRows checks if any row was changed
            check if the id to update actually exists
            if 0 then the UPDATE query didn't find a matching ID 
        */
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Task not found!" });
            return;
        }

        // returns the edited task
        res.status(200).json({ 
            id: todoId, 
            task, 
            tags: tags || "", 
            completed: Boolean(isCompleted)
        });
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// DELETE a todo
app.delete("/todos/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);

    try {
        const [result] = await db.query<ResultSetHeader>(
            "DELETE FROM todos WHERE id=?",
            [todoId]
        );

        /* 
            prevent user from deleting a non-existent id task
            confirm if something was actually deleted 
        */
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Todo not found!" });
            return;
        }

        res.status(200).json({ message: "Todo deleted successfully!" });
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// Run this development server in port 
app.listen(PORT, (): void => {
    console.log(`Server running on http://localhost:${PORT}/todos`);
});