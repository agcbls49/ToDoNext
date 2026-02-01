"use client"

import { useState } from "react";
import { Todo } from "../types/todo";

// for the dark mode
interface DarkModeProps {
    isDarkMode: boolean;
    // have to add this to prevent changing themes when add task button is clicked
    onTaskSearch?: (searchResults: Todo[]) => void;
}

export default function Search({ isDarkMode, onTaskSearch } : DarkModeProps) {
    const [searchInput, setSearchInput] = useState<string>("");

    // get search inputs
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!searchInput.trim()) return;

        try {
            // convert search input to uri so that task or tags can be searched
            const response = await fetch(`/tasks/search/${encodeURIComponent(searchInput)}`);

            if(response.ok) {
                const data = await response.json();

                if (onTaskSearch) {
                    onTaskSearch(data);
                }
            }
        }
        catch(e) {
            console.error("Error adding todo: ", e);
        }
    }

    return(
        <div>
            <form className="flex flex-row items-center gap-2 mt-5" onSubmit={handleSubmit}>
                {/* Task name input */}
                <input
                    onChange={handleSearchInput}
                    value={searchInput}
                    placeholder="Search for a Task or Tag/s"
                    className={`placeholder-gray-500 rounded-md grow border border-black p-2 flex-1 ${
                        isDarkMode ? 'border-gray-600 text-white' : 'text-black'
                    }`}
                />
                <button
                    type="submit"
                    className="font-bold text-lg bg-amber-400 text-white px-4 py-2 hover:bg-amber-500 rounded-md transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap">
                Search Task
                </button>
            </form>
        </div>
    );
}