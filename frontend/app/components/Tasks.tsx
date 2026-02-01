"use client";
import { useState, useEffect, useCallback } from "react";
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
import Search from "./Search";

// for the dark mode
interface DarkModeProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export function Tasks({ isDarkMode, toggleDarkMode }: DarkModeProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // for the pagination
    const [currentPage, setCurrentPage] = useState(1);

    // show all the todos
    const fetchTodos = useCallback(async(order: string) => {
        try {
            let endpoint = `/tasks/pages/${currentPage}`;

            // go to sorted endpoints
            if(order === "asc") { 
                endpoint = "/tasks/sort/asc/"; 
            }
            if(order === "desc") {
                endpoint = "/tasks/sort/desc/"; 
            }

            const response = await fetch(endpoint);
            const data = await response.json();
            setTodos(data);
        }
        catch(e) {
            console.error("Error fetching tasks: ", e);
        }
    }, [currentPage]);

    useEffect(() => {
        // calling fetch todos alone wouldnt make this work
        const loadTodos = async () => {
            await fetchTodos("");
        };
        loadTodos();
    }, [currentPage, fetchTodos]);

    // clicking task to show complete or not and showing it on the database
    const handleToggleComplete = async(id: number, currentStatus: boolean) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            console.log("Found task:", todoToUpdate?.task);

            if(!todoToUpdate) return;

            const response = await fetch(`/tasks/${id}`, {
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
            const endpoint = completedOnly ? "/tasks/filter/completed" : "/tasks/filter/incomplete";

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
            const response = await fetch(`/tasks/delete`, {
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
            <Search isDarkMode={isDarkMode}/>
            <div className="mt-5 flex flex-nowrap items-center w-full gap-2.5">
                <button onClick={() => fetchTodos("asc")}
                    className="flex flex-1 items-center justify-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all cursor-pointer">
                    Sort <ArrowUpAZ className="ml-2" />
                </button>
                <button onClick={() => fetchTodos("desc")}
                    className="flex flex-1 items-center justify-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all cursor-pointer">
                    Sort <ArrowUpZA className="ml-2" />
                </button>
                <button onClick={toggleDarkMode}
                    className="flex flex-1 items-center justify-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all cursor-pointer">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'} <SunMoon/>
                </button>
                <button onClick={() => fetchTodoFilters(true)} 
                    className="flex flex-1 items-center justify-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all cursor-pointer">
                    Completed <Eye />
                </button>
                <button onClick={() => fetchTodoFilters(false)}
                    className="flex flex-1 items-center justify-center whitespace-nowrap text-md bg-gray-500 text-white px-3 py-2 hover:bg-gray-600 rounded-md transition-all cursor-pointer">
                    Hide Completed <EyeOff />
                </button>
                <button onClick={handleDeleteAll} 
                    // disable button if todos length is 0 or no todos created
                    disabled={todos.length === 0}
                    className={`flex flex-1 gap-2 items-center justify-center text-md px-2 py-2 rounded-md transition-all cursor-pointer ${todos.length === 0 ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-red-500 hover:bg-red-700 text-white'}`}>
                    All <Trash2 />
                </button>
            </div>
            <ul className="mt-5">
                {Array.isArray(todos) && todos.map((todo: Todo) => (
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
            {/* Pagination */}
            <div className="flex justify-center items-center mt-5">
                <div className="flex gap-4">
                    <button onClick={() => {
                        // allow previous button clicking as long as the page is not the first page 
                            if(currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                                fetchTodos("");
                            }
                        }}
                        // Make button disabled if its the first page
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"}>
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage}
                    </span>
                    <button onClick={() => {
                        setCurrentPage(currentPage + 1);
                        fetchTodos("");
                    }}
                    className="font-bold px-4 py-2 bg-amber-400 text-white hover:bg-amber-500 rounded">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}