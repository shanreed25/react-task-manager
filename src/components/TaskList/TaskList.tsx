import type { TaskListProps } from "../../types";
import { mockTasks } from "../../data/mockTasks";
import TaskItem from "../TaskItem/TaskItem";


// "tasks = mockTasks" is a default value I am using for testing
// but if the parent does not pass a tasks prop, the mock tasks are used instead
function TaskList({tasks = mockTasks, onStatusChange, onDelete}: TaskListProps){
    return(
        <div className="flex flex-col gap-4">
        <h2>Task List</h2>
        {tasks.map((task) => (
            <TaskItem 
            //this matter because the length can change if a task is deleted
            // React uses each key to work out which TaskItem disappeared
            key={task.id}
            task={task} 
            onStatusChange={onStatusChange}
            onDelete={onDelete} 
            />
        ))}
        </div>
    )
}

export default TaskList;
