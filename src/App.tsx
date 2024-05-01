import { useState } from "react";
import CreateTask from "./Components/createTask";
import ShowTask from "./Components/showTask";
import ShowToDo from "./Components/showToDo";

function App() {
  const [getToDO, setGetToDo] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [num ,setNum] = useState(0)

  return (
    <>
      <CreateTask setNum={setNum} num={num}/>
      <div className="grid grid-cols-2">
        <div>
          <ShowTask setGetToDO={setGetToDo} setTaskId={setTaskId} num={num}/>
        </div>
        <div>
          <ShowToDo GetToDO={getToDO} taskId={taskId} />
        </div>
      </div>
    </>
  );
}

export default App;
