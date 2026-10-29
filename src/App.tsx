import { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import { mockTasks } from "./data/mockTasks";
import type { Task, TaskStatus } from "./types";

function App() {

    const [tasks, setTasks] = useState<Task[]>(mockTasks)
    const [filters, setFilters] = useState<{status?: TaskStatus, priority?: 'low' | 'medium' | 'high'}>({})

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

    function handleFilterChange(newFilters:{
      status?: TaskStatus, 
      priority?: 'low' | 'medium' | 'high'
    }){
      setFilters(newFilters)
        console.log("filtering", newFilters);
    }


    const filteredTasks = tasks.filter((task) => 
        (!filters.status || task.status === filters.status) &&
        (!filters.priority || task.priority === filters.priority)
      )

  return (
    <>
      <h1>Task Manager</h1>
      <TaskFilter onFilterChange={handleFilterChange}/>
      <TaskList 
      tasks={filteredTasks}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
       />
    </>
  )
}

export default App
