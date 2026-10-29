import { useState } from "react";
import type { ChangeEvent } from "react"
import type { TaskFilterProps, TaskStatus } from "../../types";




function TaskFilter({onFilterChange}: TaskFilterProps){
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")

    function handleStatusChange(e: ChangeEvent<HTMLSelectElement>){
        const newStatus = e.target.value
        setStatus(newStatus)
        onFilterChange({
            status: newStatus === "" ? undefined : newStatus as TaskStatus,
            priority: priority === "" ? undefined : priority as 'low' | 'medium' | 'high'
        })
        console.log(newStatus);
    }

    function handlePriorityChange(e: ChangeEvent<HTMLSelectElement>){
        const newPriority = e.target.value
        setPriority(newPriority)
        onFilterChange({
            status: status === "" ? undefined : status as TaskStatus,
            priority: newPriority === "" ? undefined : newPriority as 'low' | 'medium' | 'high'
        })
        console.log(newPriority);
    }



    return(
        <div className="mb-8">
        {/* <h2 className="">Task Filter</h2> */}
        <div className="flex gap-7">
            <div className="flex flex-col gap-1">
                <label htmlFor="status" className="text-slate-500 text-sm">Status</label>
                <select 
                id="status" 
                onChange={handleStatusChange} 
                value={status}
                className="cursor-pointer rounded-md bg-slate-700 p-1"

                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="priorities" className="text-slate-500 text-sm">Priority</label>
                <select 
                id="priorities" 
                onChange={handlePriorityChange} 
                value={priority}
                className="cursor-pointer rounded-md bg-slate-700 p-1"

                >
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