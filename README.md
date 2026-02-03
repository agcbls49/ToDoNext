# ToDoNext
A To Do Application that allows users to Create Tasks, Edit Tasks, Delete tasks and many more. 

## Features
1. Create a task (with optional tags)
2. Click a task to complete it
3. Sort tasks in ascending order*
4. Sort tasks in descending order*
5. Show only completed tasks
6. Hide all completed tasks
7. Edit a task (including tags)*
8. Set theme to Dark Mode / Light Mode*
9. Search for a task or tag/s
10. Delete a task
11. Delete all tasks
12. Pagination*
13. Back to top button

## Screenshots
<img width="969" height="878" alt="Home" src="https://github.com/user-attachments/assets/bce7d733-886f-49d7-b838-ae1f277389d3" />

### Create a Task
<img width="979" height="561" alt="Create a Task" src="https://github.com/user-attachments/assets/2dde8d74-3a2c-42eb-9e48-33f35dcd90d9" />

### Sort in Ascending Order
<img width="969" height="815" alt="Sort Ascending Order" src="https://github.com/user-attachments/assets/7e8dc58f-61f9-41ff-9ff9-4fd46ec85dee" />

### Sort in Descending Order
<img width="973" height="812" alt="Sort Descending Order" src="https://github.com/user-attachments/assets/0b9406ae-795c-4f7a-8779-fcf2adecd01f" />

### Show Completed Tasks
<img width="976" height="834" alt="Show Completed Tasks" src="https://github.com/user-attachments/assets/c98d3afc-aea8-40b2-9af0-b551d26f3da0" />

### Hide Completed Tasks
<img width="968" height="828" alt="Hide Completed Tasks" src="https://github.com/user-attachments/assets/72c7100a-c95e-45c4-9b0e-a9703d74474e" />

### Search for Task
<img width="973" height="557" alt="Search for Task" src="https://github.com/user-attachments/assets/fdc0772c-2a36-4ace-bc8b-385b945b8015" />

### Search for Tag/s
<img width="974" height="628" alt="Search for Tasks with a Tag" src="https://github.com/user-attachments/assets/4d61c486-7545-4af6-a34c-474bfd10b069" />

<img width="972" height="555" alt="Search for Tasks with Tags" src="https://github.com/user-attachments/assets/c9476a6e-fd21-4f8a-a925-77050f902e7a" />

### Edit Task
<img width="1274" height="508" alt="Edit a Task" src="https://github.com/user-attachments/assets/cfd2cdf6-f06e-436c-9b91-fb3d9c6db3f2" />

### Click Task to Complete
<img width="970" height="666" alt="Click the task to complete it" src="https://github.com/user-attachments/assets/a9f5053e-6a40-4c19-bdba-8c2ce31a642e" />

## Tech Stack

**Frontend:**
1. Tailwind CSS
2. React
3. Next.js

**Backend:**
1. Express.js
2. MySQL Database

> [!NOTE]
> 1. This web application is not mobile responsive and the database setup has to be configured manually. 
> 2. Refreshing the page switches dark mode to light mode. 
> 3. Clicking outside the input boxes or holding and dragging the mouse will close the edit screen and will redirect the user to the home page. 
> 4. Clicking the sort button will show all the tasks regardless of the current page.
> 5. Clicking the sort buttons then clicking the next or previous button will show the paginated version of the tasks again.

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

Open your browser and navigate to `localhost:4000/tasks` for the backend and `localhost:3000` for the frontend.
