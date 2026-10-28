import { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import { mockTasks } from "./data/mockTasks";
import type { Task, TaskStatus } from "./types";

function App() {
    //add tasks to state
    //pass state to TaskList

    //I do not need to use a <Task[]> type argument here 
    //because mockTasks is already typed as Task[] in mockTasks.ts
    //so TypeScript can infer T as Task[] on its own
    //But writing <Task[]> even when it isn't required is still a good habit. 
    // It makes your intent clear and keeps working if you later change the starting value to [] (for example, when loading tasks from localStorage)
    //const [tasks, setTasks] = useState(mockTasks);

    //<Task[]> is a type argument that gives the state the type Task[]
    const [tasks, setTasks] = useState<Task[]>(mockTasks)

    //parameters types must match onStatusChange in the types file
    function handleStatusChange(taskId: string, newStatus: TaskStatus){
    console.log("***Status Changed***");
    console.log(`Task Id: ${taskId}, New Status: ${newStatus}`);
  };

    //parameter types must match onDelete in types file
    function handleDelete(taskId: string) {
      console.log("***Task Deleted***");
      console.log(`Deleted Task Id: ${taskId}`);
    }

  return (
    <>
      <h1>Task Manager</h1>
      <TaskList 
      tasks={mockTasks}

      //using handleDelete() or handleStatusChange() would call them 
      // right away and pass the  return value of undefined instead of the function
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
       />
    </>
  )
}

export default App
