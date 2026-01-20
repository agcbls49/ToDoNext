import { Tasks } from "./components/Tasks";

export default function Home() {
  return (
    <div className="mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">
        ToDoNext
      </h1>
      <br />
      <div>
        <div className="font-light text-xl">
          <Tasks/>
        </div>
      </div>
    </div>
  );
}
