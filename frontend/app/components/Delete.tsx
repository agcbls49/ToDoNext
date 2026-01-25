"use client";

type DeleteProps = {
    todoId: number;
    // call back to refresh
    onDeleteSuccess: () => void;
};

export function Delete({ todoId, onDeleteSuccess }: DeleteProps) {
    const handleDelete = async (e:React.MouseEvent) => {
        /* 
            this fixes the bug where the delete button & cancel alert button being 
            clicked causes the task to be completed instead of retaining status 
        */
        e.stopPropagation();

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
        <button className="text-white text-lg bg-red-500 px-2 py-1 hover:bg-red-700 rounded-sm transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleDelete}>
            Delete
        </button>
    );
}