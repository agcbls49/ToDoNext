"use client";

type DeleteProps = {
    todoId: number;
    // call back to refresh
    onDeleteSuccess: () => void;
};

export function Delete({ todoId, onDeleteSuccess }: DeleteProps) {
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete?")) return;

        try {
            // use the delete from the express backend
            const response = await fetch(`/todos/${todoId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDeleteSuccess();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return(
        <button className="bg-red-500 px-2 py-1 hover:bg-red-700 rounded-sm"
            onClick={handleDelete}>
            Delete
        </button>
    );
}