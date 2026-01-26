// Interface Object for the Todo in the database
export interface Todo {
    id: number;
    task: string;
    tags: string;
    completed: number; // 0 or 1 in database
}

// Interface Object of todo that is sent back to the Frontend
export interface TodoResponse {
    id: number;
    task: string;
    tags: string;
    completed: boolean; // front end version
}

// Interface for Database Config Setup
export interface DatabaseConfig {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
    waitForConnections: boolean;
    connectionLimit: number;
    queueLimit: number;
}