import { useState } from "react";
import type { ChangeEvent } from "react"
import type { TaskFilterProps } from "../../types";




function TaskFilter(){
    const [status, setStatus] = useState("")

    function handleStatusChange(e: ChangeEvent<HTMLSelectElement>){
        const newStatus = e.target.value
        setStatus(newStatus)
        console.log(status);
    }
    return(
        <>
        <h2>Task Filter</h2>
        <label id="status">Status</label>
        <select id="status" onChange={handleStatusChange}>
            <option value="">ALL</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progess</option>
            <option value="completed">Completed</option>
        </select>
        </>
    )
}

export default TaskFilter;