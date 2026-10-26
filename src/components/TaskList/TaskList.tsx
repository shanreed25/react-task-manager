import type { TaskListProps } from "../../types";
import { mockTasks } from "../../data/mockTasks";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({tasks = mockTasks, onStatusChange, onDelete}: TaskListProps){
    return(
        <>
        <h2>Task List</h2>
        {tasks.map((task) => {
            // <TaskItem task={task} />
        })}
        </>
    )
}

export default TaskList;
