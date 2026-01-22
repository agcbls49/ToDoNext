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
                placeholder="What needs to be done?"
                className="rounded-s-md grow border border-gray-400 p-2"
            />
            <button type="submit" 
                className="bg-blue-500 px-2 py-1 hover:bg-blue-700 rounded-sm">
                    Add Task
            </button>
        </form>
    );
};