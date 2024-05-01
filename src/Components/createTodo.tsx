import { Dispatch, SetStateAction, useState } from "react";

export default function CreateTodo({taskId ,setRefetch}:{taskId:string ,setRefetch:Dispatch<SetStateAction<string>>}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function createTodoAction() {
    const res = await fetch(`http://localhost:8080/api/createToDo/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    const data = await res.json();

    if (data.id) {
      setBody("");
      setTitle("");
      setRefetch(data.id)
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="todo">Create your title</label>
        <input
          type="text"
          name="todo"
          id="todo"
          className="p-3 rounded-lg outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="todo">Create your body</label>
        <input
          type="text"
          name="todo"
          id="todo"
          className="p-3 rounded-lg outline-none"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          className="bg-green-600 rounded-lg p-2 mt-3"
          onClick={() => createTodoAction()}
        >
          Create new todo
        </button>
      </div>
    </>
  );
}
