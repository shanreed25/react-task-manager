import type { TaskItemProps, TaskStatus } from "../../types";


function TaskItem({task, onStatusChange, onDelete}: TaskItemProps){
    return(
        <>
        {/* <h2>Task Item</h2> */}
        <p>Task: {task.title}</p>
        <select
        value={task.status}//controls which option is shown as selected
        //onChange runs every time the a different option is selected
            //TypeScript knows the event object's type automatically
            // because it is attached to a <select>
        onChange={(e) => 
            
            //"as TaskStatus" is a type assertion that tells TypeScript
            // "trust me, this string is one of the three allowed statuses"
            //because TypeScript only knows that value is a string, but
            // onStatusChange expects a TaskStatus, not any string
            //since the dropdown only offers the allowed statues this is safe
            onStatusChange(task.id, e.target.value as TaskStatus)}
        >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>

        {/* using onClick={onDelete(task.id)}, would make onDelete
          run immediately during every render, not on click */}
        {/* using a arrow function allows it to call onDelete with 
        this task's id when the button is clicked */}
        <button onClick={() => onDelete(task.id)}>DELETE</button>
        </>
    )
}

export default TaskItem;