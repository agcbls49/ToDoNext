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
11. Pagination
12. Back to top button

## Screenshots
<img width="983" height="836" alt="Image" src="https://github.com/user-attachments/assets/c429176a-f0a1-47c7-81f6-47b83caf06f0" />
<img width="983" height="218" alt="Image" src="https://github.com/user-attachments/assets/3b064f3d-6060-48de-82de-051c14222c10" />

### Sort in Ascending Order
<img width="986" height="508" alt="Image" src="https://github.com/user-attachments/assets/3feb5411-fadb-48a9-8d9b-b0daec8a666b" />

### Sort in Descending Order
<img width="981" height="510" alt="Image" src="https://github.com/user-attachments/assets/3d515e57-f685-47c2-91b4-65ed9d8a3e85" />

### Show Completed Task/s
<img width="988" height="791" alt="Image" src="https://github.com/user-attachments/assets/ec6d142b-d1e7-4adf-9f52-542e31827aac" />

### Hide Completed Task/s
<img width="985" height="762" alt="Image" src="https://github.com/user-attachments/assets/c5a08edb-24a1-4067-a30d-cca26101ecd2" />

### Edit Task
<img width="1274" height="508" alt="Image" src="https://github.com/user-attachments/assets/cfd2cdf6-f06e-436c-9b91-fb3d9c6db3f2" />

### Click Task to Complete
<img width="990" height="636" alt="Image" src="https://github.com/user-attachments/assets/68d3582c-2af3-4dd0-8206-022452aa135c" />

## Tech Stack

**Frontend:**
1. Tailwind CSS
2. React
3. Next.js

**Backend:**
1. Express.js
2. MySQL Database

> [!NOTE]
> This web application is not mobile responsive and the database setup has to be configured manually. Refreshing the page switches dark mode to light mode. Clicking outside the input boxes or holding and dragging the mouse will close the edit screen and will redirect the user to the home page.

## Requirements to Install
1. Visual Studio Code (VSC) or any other IDE
2. Node.js*
3. MySQL Database
4. MySQL Workbench

> [!NOTE] 
> Newer versions of Node.js version are not tested. This project uses version 22.18.0 Long-Term Support (LTS).

## Running the Project
> [!NOTE] 
> The database dump file called `backup.sql` can be used for creating the database in MySQL Workbench. 

Make sure to run MySQL by pressing the `Windows + R` key and typing `services.msc`. Scroll down until you see `MySQL80` or whatever MySQL version you have. Right click and click `Start` to start the service.

Open MySQL Workbench and create a database in MySQL named ToDoNext and use the dump file in MySQL Workbench.

**Steps:**
1. Open Workbench
2. Go to Server then Data Import
3. Select Import from Self-Contained File
4. Browse to the backup.sql location
5. Select target database
6. Click Start Import

Clone the GitHub repository and open inside Visual Studio Code (VSC). Inside the backend folder, connect your MySQL database by making a .env file and filling in the blanks.

```
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=todonext_db
PORT=4000
```

> [!NOTE] 
> The default port number for the backend is 4000 but may be modified in the `backend/todos.ts` file. The frontend will then have to be updated by going to `frontend/package.json` and `frontend/next.config.ts`.

Open two terminals in VSC. In one terminal, `cd backend` and the other `cd frontend`. In both terminals run `npm install` after which run `npm run dev`. 

Open your browser and navigate to `localhost:4000/todos` for the backend and `localhost:3000` for the frontend.
