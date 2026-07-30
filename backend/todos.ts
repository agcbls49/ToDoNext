// Database Setup
import dotenv from 'dotenv';

// Load environment variables for database
dotenv.config({path: "./.env"});

// Drizzle Setup 
import { eq, sql, asc, desc } from 'drizzle-orm';
import { db } from "./db";
import { TodoResponse } from './types/db_types'

// Import the schema
import { tasks } from "./drizzle/schema";

import express, { Application, Request, Response } from 'express';
import cors from 'cors';

/* 
    10 is a radix or base, parses the string value into an integer
    used to ensure the port is always read correctly as a standard number
    necessary network-related APIs usually require a numeric port value, 
    while environment variables are always strings 
*/
const PORT: number = parseInt(process.env.PORT || '4000', 10);

// Server Setup
const app: Application = express();

// Enable CORS for NextJS app on port 3000
app.use(cors({
    origin: "http://localhost:3000"
}));

// Built-in Express middleware to parse incoming JSON request bodies
app.use(express.json());

// GET ALL todos (go to localhost:4000/)
app.get("/tasks", async (req: Request, res: Response): Promise<void> => {
    try {
        const rows = await db.select().from(tasks);

        // Convert to TodoResponse[] format
        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
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

// GET SINGLE todo (go to localhost:4000/tasks/1)
app.get("/tasks/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);

    try {
        const [todo] = await db.select().from(tasks).where(eq(tasks.id, todoId));
    
        if (!todo) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
    
        const todoResponse: TodoResponse = {
            id: todo.id,
            task: todo.task,
            tags: todo.tags || "",
            completed: Boolean(todo.completed)
        };

        res.json(todoResponse);
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// Search for todo or tags
app.get("/tasks/search/:query", async(req: Request, res: Response): Promise<void> => {
    try {
        const query = req.params.query;

        if(!query) {
            res.status(400).json({ error: "Search query required"});
            return;
        }

        // query for searching task or tags
        const rows = await db.select().from(tasks).where(sql`${tasks.task} LIKE ${`%${query}%`} OR ${tasks.tags} LIKE ${`%${query}%`}`);
        
        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
            completed: Boolean(row.completed)
        }));

        res.json(todos);
    }
    catch (e: any) {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// Pagination
app.get("/tasks/pages/:page", async(req: Request<{ page: string }>, res: Response): Promise<void> => {
    try {
        // Get page number from the url
        const page = parseInt(req.params.page);

        // Items to show per page
        const pageSize = 5;

        /* 
            if in page 1 then no skipping
            if page 2 then skip 5 since 2 - 1 = 1 * 5 = 5 
        */
        const rowsToSkip = (page - 1) * pageSize;

        const rows = await db.select().from(tasks).orderBy(tasks.id).limit(pageSize).offset(rowsToSkip);

        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
            completed: Boolean(row.completed)
        }));

        res.json(todos);
    }
    catch(e: any) {
        console.error(e);
        // Internal Server Error
        res.status(500).json({ error: "Database Error" });
    }
});

// Sort the todo alphabetically
app.get("/tasks/sort/asc", async(req: Request<{ page: string }>, res: Response): Promise<void> => {
    try {
        const rows = await db.select().from(tasks).orderBy(asc(tasks.task));
        
        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
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

// Reset the sorting
app.get("/tasks/sort/desc", async(req: Request<{ page: string }>, res: Response): Promise<void> => {
    try {
        const rows = await db.select().from(tasks).orderBy(desc(tasks.task));   

        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
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

// Filter completed only 
app.get("/tasks/filter/completed", async (req: Request, res: Response): Promise<void> => {
    try {        
        const rows = await db.select().from(tasks).where(eq(tasks.completed, 1));

        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
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

// Hide completed 
app.get("/tasks/filter/incomplete", async (req: Request, res: Response): Promise<void> => {
    try {
        const rows = await db.select().from(tasks).where(eq(tasks.completed, 0));

        const todos: TodoResponse[] = rows.map((row) => ({
            id: row.id,
            task: row.task,
            tags: row.tags || "",
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

// POST CREATE new todo
app.post("/tasks/", async (req: Request, res: Response): Promise<void> => {
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

        const [result] = await db.insert(tasks).values({
            task: task,
            tags: tags || "",
            completed: isCompleted
        });
    
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
app.put("/tasks/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);
    const { task, tags, completed }: { task?: string; tags?: string; completed?: boolean } = req.body;

    // check if its an empty task
    if (!task) {
        res.status(400).json({ message: "Task is required" });
        return;
    }

    try {
        const isCompleted: number = completed ? 1 : 0;

        const result = await db.update(tasks).set({
            task: task,
            tags: tags || "",
            completed: isCompleted
        }).where(eq(tasks.id, todoId));

        /*
            affectedRows checks if any row was changed
            if 0 then the UPDATE query didn't find a matching ID 
        */
        const affectedRows = (result as any).affectedRows;

        if (affectedRows === 0) {
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

// Delete all todos
app.delete("/tasks/delete", async (req: Request, res: Response): Promise<void> => {
    try {
        await db.delete(tasks);

        res.status(200).json({ message: "All tasks deleted successfully!" });
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// DELETE a todo
app.delete("/tasks/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const todoId: number = parseInt(req.params.id);

    try {
        const result = await db.delete(tasks).where(eq(tasks.id, todoId));

        /* 
            prevent user from deleting a non-existent id task
            confirm if something was actually deleted 
        */
        const affectedRows = (result as any).affectedRows;

        if (affectedRows === 0) {
            res.status(404).json({ message: "Task not found!" });
            return;
        }

        res.status(200).json({ message: "Task deleted successfully!" });
    } 
    catch (e: any) 
    {
        console.error(e);
        res.status(500).json({ error: "Database Error" });
    }
});

// Run this development server in port 
// changed to 0.0.0.0 for docker
app.listen(PORT, "0.0.0.0", (): void => {
    console.log(`Server running on http://localhost:${PORT}/tasks`);
});