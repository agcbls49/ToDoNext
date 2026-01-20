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
For those cloning the project.

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

MySQL Setup is included in the dump file in `backend/mysql_queries.sql`.

## Setup CORS (Cross-Origin Resource Sharing)
Since frontend runs on port 3000 and backend runs on port 4000.

```
cd ..
cd backend/
npm install cors
```

Inside `frontend/next.config.ts` below `/* config options here */` add 
```
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:4000/api',
      },
    ];
  },
```

For code, go to the following files and copy paste in desired project:
```
backend/api.js
frontend/app/page.tsx
frontend/app/components/UserList.tsx
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

Check API json object by pasting this in the browser tab: `http://localhost:4000/api`