"use client"

import { useState } from "react";

// for the dark mode
interface DarkModeProps {
    isDarkMode: boolean;
}

export default function Add({ isDarkMode } : DarkModeProps) {
    const [taskInput, setTaskInput] = useState<string>("");
    const [tagsInput, setTagsInput] = useState<string>("");
    const [tagsArray, setTags] = useState<string[]>([]);

    // update tagsArray whenever tagsInput changes
    const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTagsInput(inputValue);

        // convert comma separated string to array
        const tags = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        setTags(tags);
    }

    // for the form submission when the button is clicked it adds the new todo
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // by default when an html form is submitted 
        // it sends a POST request and re renders/refreshes the page
        e.preventDefault();

        if (!taskInput.trim()) return;

        try {
            // convert tags array to comma separated string for the backend
            const tagsString = tagsArray.join(', ');

            const response = await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task:taskInput, tags:tagsString, completed: false })
            });

            if(response.ok) {
                setTaskInput("");
                setTagsInput("");
                setTags([]);
                // refresh window to show the new todo
                window.location.reload();
            }
        }
        catch(e) {
            console.error("Error adding todo: ", e);
        }
    }

    return(
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Task name input */}
                <input value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Make a Task"
                className={`placeholder-gray-500 rounded-md grow border border-black p-2 w-full ${isDarkMode ? 'border-gray-600 text-white' : 'text-black'}`}/>
                {/* Tags input */}
                <input value={tagsInput} 
                onChange={handleTagsInputChange}
                placeholder="Add tags (comma separated)"
                className={`placeholder-gray-500 rounded-md grow border border-black p-2 w-full ${isDarkMode ? 'border-gray-600 text-white' : 'text-black'}`}/>
                {/* Add task button */}
                <button type="submit"
                className="font-bold text-lg bg-amber-400 text-white px-4 py-2 hover:bg-amber-500 rounded-md transition-all duration-300 ease-in-out cursor-pointer w-full">
                    Add Task
                </button>
            </form>
        </div>
    );
};