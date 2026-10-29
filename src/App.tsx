import { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import { mockTasks } from "./data/mockTasks";
import type { Task, TaskStatus } from "./types";

function App() {

    const [tasks, setTasks] = useState<Task[]>(mockTasks)

    function handleStatusChange(taskId: string, newStatus: TaskStatus){

      setTasks(prev => prev.map((task) =>
        task.id === taskId ? {...task, status : newStatus} : task
        )
      )
      console.log("***Status Changed***");
      console.log(`Task Id: ${taskId}, New Status: ${newStatus}`);
  };

    function handleDelete(taskId: string) {
        setTasks(prev => prev.filter((task) => 
        task.id !== taskId 
        )
      )
      console.log("***Task Deleted***");
      console.log(`Deleted Task Id: ${taskId}`);
    }

  return (
    <>
      <h1>Task Manager</h1>
      <TaskFilter onFilterChange={}/>
      <TaskList 
      tasks={tasks}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
       />
    </>
  )
}

export default App
