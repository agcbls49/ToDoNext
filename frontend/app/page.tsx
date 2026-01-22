"use client";

import { Tasks } from "./components/Tasks";
import Add from "./components/Add";

export default function Home() {
  return (
    <div className="mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold">
        ToDoNext
      </h1>
      <br />
      <div>
        <div className="font-light text-xl">
          <Add/>
          <Tasks/>
        </div>
      </div>
    </div>
  );
}
