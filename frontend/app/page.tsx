"use client";

import { Tasks } from "./components/Tasks";
import Add from "./components/Add";

export default function Home() {
  return (
    <main className='py-10 h-screen space-y-5 overflow-y-auto'>
        <h1 className='font-bold text-3xl text-center'>ToDoNext</h1>
        {/* center and give max width which prevents it from going to the edge of the screen */}
        <div className='w-[50%] dark:text-white dark:bg-[#171717] bg-gray-50 mx-auto rounded-md p-5 space-y-6 shadow-lg'>
          <Add/>
          <Tasks/>
        </div>
    </main>
  );
}
