# NextJS + ExpressJS Template
This template is for using NextJS in the frontend and ExpressJS in the backend. 

**NOTE: NextJS code is in TypeScript (default configs) and ExpressJS is in JavaScript.**

## Cloning to be used
Install GitHub Desktop and create a folder to put this cloned project. In GitHub make sure that `Folder/` is selected as a directory and copy the url of this project. Once cloned, the folder will now have the following inside:
```
frontend
backend
README.md
```

Install dependencies:
```
cd frontend/
npm install
cd ..
cd backend/
npm i express
npm i nodemon -D
npm install cors
npm fund
```

## Initial Setup
```
cd backend/
npm init -y
touch api.js
npm i express
npm i nodemon -D
```

Inside `backend/package.json` rename `"main": "index.js"` to `"main": "api.js"` and inside `"scripts":{` add 
```
"start": "node server",
"dev": "nodemon server" 
```

```
cd ..
cd frontend/
npx create-next-app@latest .
```

Choose `Yes, use recommended defaults` using the `Enter` key. The default configurations include TailwindCSS, ReactJS and TypeScript.

## Setup CORS (Cross-Origin Resource Sharing)
Since frontend runs on port 3000 and backend runs on port 4000.

```
cd ..
cd backend/
npm install cors
```

In `frontend/package.json`, below `"name": "client",` add 
`"proxy": "http://localhost:4000",`.

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

## Run the Template
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
