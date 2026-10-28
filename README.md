# React + TypeScript Task Manager

> A component that displays a list of tasks, filter them by status, and show different visual states based on task properties. The component is reusable, type-safe, and handles various task states efficiently.


## Current Status
> Displays the task list, with 10 mock task, each with a title, a status dropdown, and a DELETE button.

- Data flows down and the events flow up
- The mock task is a plain array, not React state
- If you change a dropdown, the console logs the task id and the new status. The dropdown then goes back to the old value. That's because it's a controlled `<select>` `(value={task.status})`, and nothing updates `task.status` yet.
- If you click DELETE, the console logs the id, but the task stays on the page for because there is no logic to delete yet


```
main.tsx
  └─ App
       └─ TaskList   
            └─ TaskItem 

```

## Component Implementation
 
- [ ] Implement each component according to its interface requirements
- [X] Use proper TypeScript types and interfaces
- [X] Implement list rendering with unique keys
- [ ] Add conditional rendering based on task properties

#### App
- Defines handleStatusChange and handleDelete. Right now both only console.log the task id (and the new status)
- Renders <TaskList> and passes it mockTasks plus the two handlers. The handlers are passed by reference (onDelete={handleDelete}, not handleDelete()), as your comment explains

#### TaskList
> Receives tasks and two callbacks

- Uses tasks.map(...) to render one TaskItem per task, with key={task.id} so React can track each item
- It doesn't handle events itself. It passes onStatusChange and onDelete down to each TaskItem, which is prop drilling


#### Task Item
> For each task it shows

- The title
- A `<select>` whose value is `task.status`. Changing it calls `onStatusChange(task.id, newValue)`. The as TaskStatus is needed because `e.target.value` is typed as a plain string
- A DELETE button that calls `onDelete(task.id)` through an arrow function, so it runs on click and not during render



## List Management
 
- [X] Render the task list with proper key props
- [ ] Implement filtering functionality
- [ ] Handle task status changes
- [ ] Implement task deletion

## Visual Feedback
 
- [ ] Show different styles based on task status and priority
- [ ] Implement hover and active states
- [ ] Add visual indicators for task properties

## Component Composition
 
- [ ] Compose components to create a complete task management interface
- [ ] Handle prop passing between components
- [ ] Implement proper event handling
 