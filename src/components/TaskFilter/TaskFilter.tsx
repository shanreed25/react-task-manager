import { useState } from "react";
import type { ChangeEvent } from "react"
import type { TaskFilterProps } from "../../types";




function TaskFilter(){
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")

    function handleStatusChange(e: ChangeEvent<HTMLSelectElement>){
        const newStatus = e.target.value
        setStatus(newStatus)
        console.log(newStatus);
    }

    function handlePriorityChange(e: ChangeEvent<HTMLSelectElement>){
        const newPriority = e.target.value
        setPriority(newPriority)
        console.log(newPriority);
    }

    return(
        <div>
        <h2>Task Filter</h2>
        <div>
            <div>
                <label htmlFor="status">Status</label>
                <select id="status" onChange={handleStatusChange}>
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div>
                <label id="priorities">Priority</label>
                <select id="priorities" onChange={handlePriorityChange}>
                    <option value="">All priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
        </div>

        </div>
    )
}

export default TaskFilter;