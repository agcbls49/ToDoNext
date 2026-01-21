# ToDoNext
A To Do Application that uses the following technologies:

**Frontend:**
1. Tailwind CSS
2. React JS
3. Next.js

**Backend:**
1. Express JS
2. MySQL Database

## Setup
For those cloning the project or want to recreate the setup.

```
cd frontend/
npm install
cd ..
```

Choose `Yes, use recommended defaults` using the `Enter` key. The default configurations include TailwindCSS, ReactJS and TypeScript.

```
cd backend/
npm init -y
touch api.js
npm install express mysql2 dotenv cors
npm i nodemon -D
```

**NOTE: THIS IS IMPORTANT SINCE THE FRONTEND WILL SAY "map is not a function" IF NOT DONE CORRECTLY.**

MySQL Setup is included in the dump file in `backend/mysql_queries.sql`. Make sure MySQL is running by doing the following:
1. Press Windows Key + R key on the keyboard
2. Scroll until MySQL80, right click on it, and click start
3. Open MySQL Workbench and the database
4. Input the password needed for the database and the status will now say running

## Setup CORS (Cross-Origin Resource Sharing)
Since frontend runs on port 3000 and backend runs on port 4000.

Inside `frontend/next.config.ts` below `/* config options here */` add 
```
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:4000/todos',
      },
    ];
  },
```

For code, go to the following files and copy paste in desired project:
```
backend/todos.js
frontend/app/page.tsx
frontend/app/components/Tasks.tsx
```

## Run the Project
Open two terminals. Do this for the frontend:
```
cd frontend/
npm run dev
```

Do this for the backend:
```
cd backend/
npm run dev
```

**NOTE: Make sure both the two localhost are opened by doing the commands above.**

Check API json object by pasting this in the browser tab: `http://localhost:4000/todos`