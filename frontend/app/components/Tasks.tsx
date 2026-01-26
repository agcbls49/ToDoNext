"use client";
import { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { Delete } from "./Delete";

// Import the type interface for the todos
import { Todo } from "../types/todo";

// Icons
import { ArrowUpAZ } from 'lucide-react';
import { ArrowUpZA } from 'lucide-react';
import { SunMoon } from 'lucide-react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Trash2 } from 'lucide-react';

// for the dark mode
interface DarkModeProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export function Tasks({ isDarkMode, toggleDarkMode }: DarkModeProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // show all the todos
    const fetchTodos = async(order: string) => {
        try {
            // default endpoint to fetch all todos
            let endpoint = "/todos";
        
            // go to sorted endpoints
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

    // for show completed only and hide completed
    const fetchTodoFilters = async(completedOnly: boolean) => {
        try {
            const endpoint = completedOnly ? "http://localhost:4000/todos/filter/completed" : "http://localhost:4000/todos/filter/incomplete";

            const response = await fetch(endpoint);
            if (!response.ok) throw new Error("Network response is NOT OK");
            const data = await response.json();
            setTodos(data);
        }
        catch(e) {
            console.error("Error fetching tasks: ", e);
        }
    };

    // delete all todos
    const handleDeleteAll = async () => {
        if (!confirm("Are you sure you want to delete?")) return;

        try {
            // use the delete from the express backend
            const response = await fetch(`/todos/delete`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete all tasks");

            // Update the UI to show empty
            setTodos([]); 
        
            alert("All tasks deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div>
            {/* Add task button */}
            <Add isDarkMode={isDarkMode} onTaskAdded={() => fetchTodos("")}/>
            {/* Sorting buttons */}
            <div className="mt-5 flex flex-nowrap items-center gap-2">
                <button onClick={() => fetchTodos("asc")}
                    className="flex items-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all shrink-0 cursor-pointer">
                    Sort <ArrowUpAZ className="ml-2" />
                </button>
                <button onClick={() => fetchTodos("desc")}
                    className="flex items-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all shrink-0 cursor-pointer">
                    Sort <ArrowUpZA className="ml-2" />
                </button>
                <button onClick={toggleDarkMode}
                    className="flex gap-2 items-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all shrink-0 cursor-pointer">
                    Switch to {isDarkMode ? 'Light Mode' : 'Dark Mode'} <SunMoon/>
                </button>
                <button onClick={() => fetchTodoFilters(true)} 
                    className="flex gap-2 items-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all shrink-0 cursor-pointer">
                    Show Completed Only <Eye />
                </button>
                <button onClick={() => fetchTodoFilters(false)}
                    className="flex gap-2 items-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all shrink-0 cursor-pointer">
                    Hide Completed <EyeOff />
                </button>
                <button onClick={handleDeleteAll} 
                    // disable button if todos length is 0 or no todos created
                    disabled={todos.length === 0}
                    className={`flex gap-1 items-center text-md px-2 py-2 rounded-md transition-all shrink-0 cursor-pointer ${todos.length === 0 ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-red-500 hover:bg-red-700 text-white'}`}>
                    Delete All <Trash2 />
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
                        className={`flex justify-between items-center text-lg py-3 px-4 mb-3 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer 
                            ${isDarkMode ? 'bg-[#0a0a0a] text-white hover:shadow-[0_0_15px_rgba(255,240,0,0.3)]' : 'bg-white text-black hover:shadow-xl'}`}>
                        <div className="flex items-center space-x-4">
                        {/* Only the task text gets line-through and opacity */}
                            <strong className={`text-lg
                                ${isDarkMode ? 'text-white' : 'text-black'}
                                ${todo.completed ? 'line-through opacity-70' : ''}`}>
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
                                <Edit isDarkMode={isDarkMode}
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