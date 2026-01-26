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
### Show Newly Created Task
<img width="974" height="818" alt="Image" src="https://github.com/user-attachments/assets/b60ef07d-0ced-4160-90c9-a3b795fe5ab1" />

### Sort in Ascending Order
<img width="981" height="827" alt="Image" src="https://github.com/user-attachments/assets/48c000fc-b09d-44ad-a85f-5a0c0d8d6cd7" />

### Sort in Descending Order
<img width="988" height="779" alt="Image" src="https://github.com/user-attachments/assets/b30902a4-0058-4a09-b829-c9383758791b" />

### Show Completed Task/s
<img width="986" height="598" alt="Image" src="https://github.com/user-attachments/assets/7f070db0-62d4-4676-9d7e-34cdf7a11a5c" />

### Hide Completed Task/s
<img width="984" height="749" alt="Image" src="https://github.com/user-attachments/assets/f3fd3e75-0f6c-4bc5-ba0b-a29f8cc30561" />

### Edit Task
<img width="1274" height="508" alt="Image" src="https://github.com/user-attachments/assets/cfd2cdf6-f06e-436c-9b91-fb3d9c6db3f2" />

### Click Task to Complete
<img width="987" height="791" alt="Image" src="https://github.com/user-attachments/assets/95ec9076-8e5d-426d-a2f6-f9d0ab2d9bea" />


## Screenshots (Light Mode)
<img width="979" height="824" alt="Image" src="https://github.com/user-attachments/assets/b30aad64-aae9-486c-843a-fe4cc609a8f3" />

<img width="1271" height="496" alt="Image" src="https://github.com/user-attachments/assets/f8190900-ea79-4be1-8a78-e300c702ce32" />

<img width="981" height="839" alt="Image" src="https://github.com/user-attachments/assets/4cccd53a-4c9f-4376-a789-ec7bc8555b17" />

<img width="992" height="738" alt="Image" src="https://github.com/user-attachments/assets/45d0cd74-9218-4b41-a93f-3ec18e3e6b07" />

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

## Running the Project
**NOTE:** The database dump file called `mysql_queries.sql` can be used for creating the database in MySQL Workbench. 

Make sure to run MySQL by pressing the `Windows + R` key and typing `services.msc`. Scroll down until you see `MySQL80` or whatever MySQL version you have. Right click and click `Start` to start the service.

Open MySQL Workbench and create a database in MySQL named ToDoNext and copy the SQL queries inside the file then run the query.

### Example Output in MySQL
<img width="1089" height="538" alt="Image" src="https://github.com/user-attachments/assets/ff7bf3d9-bf52-4df1-b2e6-58a68128a83a" />

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
