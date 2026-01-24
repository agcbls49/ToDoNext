"use client";
import { useState, useEffect } from "react";
import { Delete } from "./Delete";
import Edit from "./Edit";

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

    // clicking task to show complete or not and showing it on the database
    const handleToggleComplete = async(id: number, currentStatus: boolean) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === todo.id);

            if(!todoToUpdate) return;

            const response = await fetch(`/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    task: todoToUpdate.task,
                    tags: todoToUpdate.tags,
                    completed: !currentStatus // Toggle the status
                })
            });

            if(response.ok) {
                // update the status visually
                setTodos(todos.map(todo => todo.id === id ? 
                    {...todo, completed: !currentStatus}
                    : todo));
            }
        }
        catch(e) {
            console.error("Error updating status: ", e);
        }
    }
    return (
        <div>
            <ul>
                {todos.map((todo: Todo) => (
                    // task entry
                    <li key={todo.id} onClick={() => handleToggleComplete(todo.id, todo.completed)}
                        className={`flex justify-between items-center text-lg py-3 px-4 mb-3 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer dark:hover:shadow-[0_0_15px_rgba(255,240,0,0.3)]`}>
                        <div className="flex items-center space-x-4">
                        {/* Only the task text gets line-through and opacity */}
                            <strong className={`text-lg dark:text-white ${todo.completed ? 'line-through opacity-70' : ''}`}>
                                {todo.task}
                            </strong>
                        {/* tags pill */}
                            {todo.tags && todo.tags.trim() && (
                            <div className="flex flex-wrap gap-2">
                                {/* split string into array and display each tag */}
                                    {todo.tags.split(',').map((tag: string, index: number) => (
                                        tag.trim() && (
                                            <span key={index} className="text-sm font-semibold px-3 py-1 bg-amber-400 text-black dark:bg-amber-400 dark:text-amber-800 rounded-full">
                                                {tag.trim()}
                                            </span>
                                        )
                                    ))}
                            </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            {todo.completed ? "": 
                                <Edit 
                                todo={todo} // Pass entire todo object
                                onEditComplete={() => {
                                    // Handle edit completion
                                    fetchTodos(); // Refresh the list
                                }}
                                />
                            }
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