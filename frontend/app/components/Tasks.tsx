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
                    <li key={todo.id} className={`flex justify-between items-center text-lg py-3 px-4 mb-3 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-lg hover:shadow-2xl transition-shadow dark:hover:shadow-[0_0_15px_rgba(255,240,0,0.3)] ${todo.completed ? 'line-through opacity-70' : ''}`}>
                        <div className="flex items-center space-x-4">
                            <strong className="text-lg dark:text-white">{todo.task}</strong>
                            {todo.tags && (
                                // tags pill
                                <span className="text-sm font-semibold px-3 py-1 bg-amber-400 text-black dark:bg-amber-400 dark:text-amber-800 rounded-full border border-none">
                                    {todo.tags}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* PUT EDIT BUTTON HERE */}
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