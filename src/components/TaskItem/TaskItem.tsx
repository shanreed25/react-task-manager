import type { TaskItemProps } from "../../types";


function TaskItem({task, onStatusChange, onDelete}: TaskItemProps){
    return(
        <>
        <h2>Task Item</h2>
        <p>Task: {task.title}</p>
        </>
    )
}

export default TaskItem;