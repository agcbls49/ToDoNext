"use client"

import { useState } from "react";

export default function Add() {
    const [input, setInput] = useState<string>("");

    // for the form submission when the button is clicked it adds the new todo
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // by default when an html form is submitted 
        // it sends a POST request and re renders/refreshes the page
        e.preventDefault();

        if (!input.trim()) return;

        try {
            const response = await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task:input, tags:"", completed: false })
            });

            if(response.ok) {
                setInput("");
                // refresh window to show the new todo
                window.location.reload();
            }
        }
        catch(e) {
            console.error("Error adding todo: ", e);
        }
    }

    return(
        <form className="flex" onSubmit={handleSubmit}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Make a task"
                className="dark:text-white dark:border-white placholder-gray-500 rounded-s-md grow border border-black p-2"
            />
            <button type="submit" 
                className="font-bold text-white bg-green-600 px-1 py-1 hover:bg-green-700 rounded-e-sm transition-all duration-300 ease-in-out cursor-pointer">
                    Add Task
            </button>
        </form>
    );
};