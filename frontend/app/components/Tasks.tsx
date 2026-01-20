export async function Tasks() {
    // API Component
    const response = await fetch("http://localhost:4000/todos", {
        cache: "no-store", 
    });
    
    const data = await response.json();

    return (
        <ul>
            {data.map((row:any) => (
                <li key={row.id}>
                    <strong>{row.task}</strong> 
                </li>
            ))}
        </ul>
    );
}