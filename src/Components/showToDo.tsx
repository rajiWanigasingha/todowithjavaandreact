import { useEffect, useState } from "react";
import CreateTodo from "./createTodo";

interface todos {
  id: number;
  title: string;
  body: string;
  complete: boolean;
  createAt: Date;
}

interface data {
  id: string;
  taskName: string;
  todos: todos[];
}

export default function ShowToDo({
  GetToDO,
  taskId,
}: {
  GetToDO: boolean;
  taskId: string;
}) {
  const [data, setData] = useState<data>();
  const [refetch, setRefetch] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://localhost:8080/api/getSingleTask/${taskId}`
      );

      const data = await res.json();

      console.log(data);

      setData(data);
    }

    getData();
  }, [GetToDO, taskId, refetch]);

  async function Complete(taskId: string, id: number) {
    const res = await fetch(
      `http://localhost:8080/api/completeToDo/${taskId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          complete: true,
        }),
      }
    );

    const data = await res.json();

    console.log(data)
    setData(data);
  }

  return (
    <>
      {GetToDO ? (
        <div className="w-full flex flex-col p-5 gap-5">
          <div>
            <h1 className="font-bold font-sans text-2xl">{data?.taskName}</h1>
          </div>
          <CreateTodo taskId={data?.id as string} setRefetch={setRefetch} />
          <div className="w-full mt-5 flex flex-col gap-2">
            {data?.todos.map((val, index) => (
              <div
                className="bg-purple-600 rounded-lg p-2 flex flex-row justify-between items-center"
                key={index}
              >
                <div className="flex flex-col">
                  <h1 className="text-lg font-mono">{val.title}</h1>
                  <h1 className="text-sm font-mono">{val.body}</h1>
                </div>
                <div>
                  {!val.complete ? (
                    <button
                      className="px-4 py-2 bg-yellow-600 rounded-lg"
                      onClick={() => Complete(data.id, val.id)}
                    >
                      Complete
                    </button>
                  ) : (
                    <div>
                      <h1 className="text-green-600 text-base font-sans">
                        Completed
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full p-5 flex justify-center">
          <h1 className="font-sans text-xl">
            Selecte task to add or see todos
          </h1>
        </div>
      )}
    </>
  );
}
