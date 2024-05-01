import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface todos {
  id: number;
  title: string;
  body: string;
  compleate: boolean;
  createAt: Date;
}

interface data {
  id: string;
  taskName: string;
  todos: todos[];
}

export default function ShowTask({
  setGetToDO,
  setTaskId,
  num
}: {
  setGetToDO: Dispatch<SetStateAction<boolean>>;
  setTaskId: Dispatch<SetStateAction<string>>;
  num:number;
}) {
  const [data, setData] = useState<data[]>();

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:8080/api/getAllTask");

      const data = (await res.json()) as data[];

      console.log(data);

      setData(data);
    }

    getData();
  },[num])

  function changeGetToDo(id: string) {
    setGetToDO(true);
    setTaskId(id);
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:8080/api/getAllTask");

      const data = (await res.json()) as data[];

      console.log(data);

      setData(data);
    }

    getData();
  }, []);

  async function deleteTask(id: string) {
    const res = await fetch(`http://localhost:8080/api/deleteTask/${id}`, {
      method: "DELETE",
    });

    const dataRes = await res.json();

    if (dataRes.Message === "success") {
      const newArray = data?.filter((item) => item.id !== id);
      setData(newArray);
    }
  }

  return (
    <>
      {data ? (
        <div className="w-full flex flex-col p-5 gap-5">
          <div>
            <h1 className="font-bold font-sans text-2xl">
              All tasks you have to do
            </h1>
          </div>
          {data.map((values, index) => (
            <>
              <div
                className="w-full cursor-pointer"
                onClick={() => changeGetToDo(values.id)}
                key={index}
              >
                <div className="bg-purple-600 rounded-lg p-2 flex flex-row justify-between items-center">
                  <div>
                    <h1 className="text-lg font-mono">{values.taskName}</h1>
                  </div>
                  <div>
                    <button
                      className="px-4 py-2 bg-red-600 rounded-lg"
                      onClick={() => deleteTask(values.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <h1>No Data. Try to create new task</h1>
        </div>
      )}
    </>
  );
}
