"use client"

import { useState } from "react";
import { Todo } from "../types/todo";
import { Pencil } from 'lucide-react';

type EditProps = {
    todo: Todo; 
    onEditComplete: () => void;
};

export default function Edit({ todo, onEditComplete }: EditProps) {
    const [task, setTask] = useState<string>(todo.task);
    const [tags, setTags] = useState<string>(todo.tags);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleEdit = async() => {
        try {
            const response = await fetch(`/todos/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    task,
                    tags,
                    // keep the existing completed status
                    completed: todo.completed
                })
            });

            if (!response.ok) throw new Error("Failed to update todo");

            setIsModalOpen(false);
            // reload
            onEditComplete();
        }
        catch(e) {
            console.log("Failed to edit task: ", e);
        }
    };

    return(
        <>
            <button
                onClick={(e) => {
                    // prevent editing when status is completed
                    if (todo.completed) return;
                    // propagation is when events add up so stopPropagation is needed
                    // so when the input is clicked it doesnt show all the tasks behind the modal
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}
                // prevent modal from closing when mouse is held and dragged
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-500 text-white px-3 py-1 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer text-lg">
                <Pencil />
            </button>

            {/* modal overlay for editing task */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#e9e9e9] dark:bg-[#0a0a0a] bg-opacity-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(false); // Close modal when clicking overlay
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    >
                    {/* Input form */}
                    <div className="space-y-4"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        >
                        {/* notice box */}
                        <div className="w-250 bg-red-600 text-white p-3 rounded-md text-md">
                            <strong>NOTICE</strong>
                            <br />
                            Clicking outside the inputs or holding and dragging the mouse will close this screen and redirect to the home page.
                        </div>

                        {/* Task input */}
                        <div className="w-250 mt-10">
                            <label className="block text-black text-md font-medium mb-1 dark:text-gray-300">
                                Task
                            </label>
                            <input value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="w-full text-black bg-white dark:text-white dark:bg-[#171717] dark:border-gray-600 placeholder-gray-500 rounded-md border border-black p-3"
                                placeholder="Edit Task"
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Tags input */}
                        <div>
                            <label className="block text-black text-md font-medium mb-1 dark:text-gray-300">
                                Tags
                            </label>
                            <input value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full text-black bg-white dark:text-white dark:bg-[#171717] dark:border-gray-600 placeholder-gray-500 rounded-md border border-black p-3"
                                placeholder="Edit tags (comma separated)"
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* buttons for modal */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit();
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                className="flex-1 font-bold bg-amber-400 text-white px-4 py-2 hover:bg-amber-500 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
                                Save
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(false);
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                className="flex-1 font-bold bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}