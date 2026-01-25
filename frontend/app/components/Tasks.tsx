"use client";
import { useState, useEffect } from "react";
import { Delete } from "./Delete";
import Edit from "./Edit";

// Import the type interface for the todos
import { Todo } from "../types/todo";

// Icons
import { ArrowUpAZ } from 'lucide-react';
import { ArrowUpZA } from 'lucide-react';
import { SunMoon } from 'lucide-react';

export function Tasks() {
    const [todos, setTodos] = useState<Todo[]>([]);

    // show all the todos
    const fetchTodos = async(order: string) => {
        try {
            let endpoint = "/todos";
        
            if(order === "asc") { 
                endpoint = "/todos/sort/asc"; 
            }
            if(order === "desc") {
                endpoint = "/todos/sort/desc"; 
            }

            const response = await fetch(endpoint);
            const data = await response.json();
            setTodos(data);
        }
        catch(e) {
            console.error("Error fetching tasks: ", e);
        }
    };

    useEffect(() => {
        // calling fetch todos alone wouldnt make this work
        const loadTodos = async () => {
            await fetchTodos("");
        };
        loadTodos();
    }, []);

    // clicking task to show complete or not and showing it on the database
    const handleToggleComplete = async(id: number, currentStatus: boolean) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            console.log("Found todo:", todoToUpdate?.task);

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
                const updatedTodo = await response.json();

                // get the updated data to prevent duplicates
                setTodos(todos.map(todo => todo.id === id ? 
                    {...todo, completed: updatedTodo.completed} : todo));
            }
        }
        catch(e) {
            console.error("Error updating status: ", e);
        }
    }
    return (
        <div>
            {/* Sorting buttons */}
            <div className="flex space-x-5">
                <button onClick={() => fetchTodos("asc")}
                    className="flex items-center text-lg bg-gray-500 text-white px-8 py-2 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
                    Sort Ascending <ArrowUpAZ className="ml-2" />
                </button>
                <button onClick={() => fetchTodos("desc")}
                    className="flex items-center text-lg bg-gray-500 text-white px-6 py-2 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
                    Sort Descending <ArrowUpZA className="ml-2" />
                </button>
                <button 
                    className="flex items-center text-lg bg-gray-500 text-white px-6 py-2 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
                    <SunMoon />
                </button>
            </div>
            <ul className="mt-5">
                {todos.map((todo: Todo) => (
                    // task entry
                    <li key={todo.id} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleComplete(todo.id, todo.completed)
                        }}
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
                                    fetchTodos(""); // Refresh the list
                                }}
                                />
                            }
                            <Delete 
                                // this will delete the todo by using the id of the todo
                                todoId={todo.id} 
                                onDeleteSuccess={() => fetchTodos("")} 
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}