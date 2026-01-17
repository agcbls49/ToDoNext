export async function UserList() {
    // API Component
    const response = await fetch("http://localhost:4000/api", {
        cache: "no-store", 
    });
    
    const data = await response.json();

    return (
        <ul>
        {data.users.map((user: string, index: number) => (
            <li key={index}>{user}</li>
        ))}
        </ul>
    );
}