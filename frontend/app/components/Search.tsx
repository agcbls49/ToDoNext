"use client"

import { useState } from "react";

// for the dark mode
interface DarkModeProps {
    isDarkMode: boolean;
    // have to add this to prevent changing themes when add task button is clicked
    onTaskAdded?: () => void;
}

export default function Search({ isDarkMode, onTaskAdded } : DarkModeProps) {
    const [searchInput, setSearchInput] = useState<string>("");

    
    return(
        <div>
            <form className="flex flex-row items-center gap-2 mt-5">
                {/* Task name input */}
                <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for a Task"
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