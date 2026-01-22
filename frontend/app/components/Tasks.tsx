"use client";
import { useState, useEffect } from "react";
import { Delete } from "./Delete";
// Import the type interface for the todos
import { Todo } from "../types/todo";

export function Tasks() {
    const [todos, setTodos] = useState<Todo[]>([]);

    // show all the todos
    const fetchTodos = async() => {
        try {
            const response = await fetch("/todos");
            const data = await response.json();
            setTodos(data);
        }
        catch(e) {
            console.error("Error fetching tasks: ", e);
        }
    };

    useEffect(() => {
        Promise.resolve().then(fetchTodos);
    }, []);

    return (
        <div>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <strong>{todo.task}</strong>

                        <div className="space-x-2">
                            
                            {/* EDIT THIS LATER */}
                            <Delete 
                                // this will delete the todo by using the id of the todo
                                todoId={todo.id} 
                                onDeleteSuccess={fetchTodos} 
                            />
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}