import { Dispatch, SetStateAction, useState } from "react";

export default function CreateTask({setNum ,num}:{setNum:Dispatch<SetStateAction<number>> ,num:number}) {
  const [task, setTask] = useState("");

  async function createATask() {
    const res = await fetch("http://localhost:8080/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: task,
        todos: [],
      }),
    })

    const data = await res.json()

    if(data.id){
        setTask("")
        setNum(num + 1)
    }
  }

  return (
    <>
      <div className="w-full p-3 bg-blue-600 flex flex-row items-center justify-end gap-5">
        <input
          placeholder="Name New Task"
          type="text"
          name="task"
          id="task"
          className="w-[300px] p-3 rounded-lg outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-green-600 rounded-lg p-3"
          onClick={() => createATask()}
        >
          Create new task
        </button>
      </div>
    </>
  );
}
