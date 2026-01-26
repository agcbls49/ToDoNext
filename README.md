# ToDoNext
A To Do Application that allows users to Create Tasks, Edit Tasks, Delete tasks and many more. 

## Features
1. Create a task (with optional tags)
2. Click a task to complete
3. Sort tasks in ascending order
4. Sort tasks in descending order
5. Show only completed tasks
6. Hide all completed tasks
7. Edit a task (including tags)*
8. Set theme to Dark Mode / Light Mode*
9. Delete a task
10. Delete all tasks
11. Back to top button

## Screenshots


## Screenshot (Light Mode)


## Tech Stack

**Frontend:**
1. Tailwind CSS
2. React
3. Next.js

**Backend:**
1. Express.js
2. MySQL Database

## Important Note
This web application is not mobile responsive and the database is not included. Refreshing the page switches dark mode to light mode. Clicking outside the input boxes or holding and dragging the mouse will close the edit screen and will redirect the user to the home page.

## Requirements to Install
1. Visual Studio Code (VSC) or any other IDE
2. Node.js*
3. MySQL Database
4. MySQL Workbench

**NOTE:** Newer versions of Node.js version are not tested. This project uses version 22.18.0 Long-Term Support (LTS).

## Running the project
**NOTE:** The database dump file called `mysql_queries.sql` can be used for creating the database in MySQL Workbench. 

Make sure to run MySQL by pressing the `Windows + R` key and typing `services.msc`. Scroll down until you see `MySQL80` or whatever MySQL version you have. Right click and click `Start` to start the service.

Open MySQL Workbench and create a database in MySQL named ToDoNext and copy the SQL queries inside the file then run the query.

### Example Output in MySQL


Clone the GitHub repository and open inside Visual Studio Code (VSC). Inside the backend folder, connect your MySQL database by making a .env file and filling in the blanks.

```
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=todonext_db
PORT=4000
```

**NOTE:** The default port number for the backend is 4000 but may be modified in the `backend/todos.ts` file. The frontend will then have to be updated by going to `frontend/package.json` and `frontend/next.config.ts`.

Open two terminals in VSC. In one terminal, `cd backend` and the other `cd frontend`. In both terminals run `npm install` after which run `npm run dev`. 

Open your browser and navigate to `localhost:4000/todos` for the backend and `localhost:3000` for the frontend.