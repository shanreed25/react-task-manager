import { useState } from "react";



function TaskFilter(){
    const [status, setStatus] = useState("")
    return(
        <>
        <h2>Task Filter</h2>
        <label id="status">Status</label>
        <select id="status">
            <option value="">ALL</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progess</option>
            <option value="completed">Completed</option>
        </select>
        </>
    )
}

export default TaskFilter;