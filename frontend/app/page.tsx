"use client";

import { Tasks } from "./components/Tasks";
import { useState } from "react";

import { ArrowUp } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  function toggleDarkMode():void {
    setDarkMode(!isDarkMode);
  }

  return (
    <main className={`py-10 h-screen space-y-5 overflow-y-auto ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#e9e9e9] text-black'}`}>
        <h1 className='font-bold text-3xl text-center'>ToDoNext</h1>
        {/* center and give max width which prevents it from going to the edge of the screen */}
        <div className={`w-[50%] mx-auto rounded-md p-5 space-y-6 shadow-lg ${isDarkMode ?  'bg-[#171717] text-white' : 'bg-gray-50 text-black'}`}>
          <Tasks isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
          {/* Back to top button */}
          <div className="flex justify-center mt-10">
            <button onClick={(e) => e.currentTarget.closest('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="gap-1 text-base bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer flex items-center">
                Back to Top <ArrowUp />
            </button>
          </div>
        </div>
    </main>
  );
}
