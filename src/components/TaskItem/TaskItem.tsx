import type { Task, TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
    function getPriorityStyles(priority: Task["priority"]){
        switch (priority) {
        case "low":
            return "text-green-600";
        case "medium":
            return "text-amber-500";
        case "high":
            return "text-red-600";
        default:
            return "text-yellow-500"
    }
    }
  return (
    <div className="p-5 border border-slate-100 rounded-lg flex justify-between gap-5 items-start">
      <div className="flex flex-col gap-3">
        <p>{task.title}</p>
        <p>{task.description}</p>
        <div>
          <p className={getPriorityStyles(task.priority)}>Priority: {task.priority}</p>
          <p>Due: {task.dueDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <select
          id={`task-${task.id}-status`}
          name="task-status"
          value={task.status} //controls which option is shown as selected
          //onChange runs every time the a different option is selected
          //TypeScript knows the event object's type automatically
          // because it is attached to a <select>
          onChange={(e) =>
            //"as TaskStatus" is a type assertion that tells TypeScript
            // "trust me, this string is one of the three allowed statuses"
            //because TypeScript only knows that value is a string, but
            // onStatusChange expects a TaskStatus, not any string
            //since the dropdown only offers the allowed statues this is safe
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
          className="cursor-pointer bg-white text-blue-700"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button 
        className="cursor-pointer rounded-md py-1 px-2 bg-red-600 hover:bg-white hover:text-red-600"
        onClick={() => onDelete(task.id)}
        >
            DELETE
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
