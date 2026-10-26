import TaskList from "./components/TaskList/TaskList";
import { mockTasks } from "./data/mockTasks";
import type { TaskStatus } from "./types";

function App() {

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
