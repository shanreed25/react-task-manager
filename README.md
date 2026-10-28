# React + TypeScript Task Manager

> A component that displays a list of tasks, filter them by status, and show different visual states based on task properties. The component is reusable, type-safe, and handles various task states efficiently.


## Current Status
> Displays the task list, with 10 mock task, each with a title, a status dropdown, and a DELETE button.

- Data flows down and the events flow up
- The mock task is a plain array, not React state
- If you change a dropdown, the console logs the task id and the new status and the status changes
- If you click DELETE, the console logs the id, and the task is deleted


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
- Defines and implements `handleStatusChange()` and `handleDelete()`. 
- Renders `<TaskList>` and passes the tasks state plus the two handlers to it
- Tasks status can now be changed
     - Task are stored in state and `handleStatusChange()` now updates the state
     - mockTasks is now only the starting value, the real list is the tasks state
     - `<Task[]>` is a type argument that gives the state its type, so tasks is a `Task[]` and setTasks only accepts a `Task[]`.
     - React keeps this value between renders, and calling `setTasks()` triggers a re-render
- Tasks can now be deleted and `handleDelete()` now updates state

#### TaskList
> Receives tasks and two callbacks

- Uses `tasks.map(...)` to render one `TaskItem` per task, with `key={task.id}` so React can track each item
- It doesn't handle events itself. It passes onStatusChange and `onDelete` down to each `TaskItem`, which is prop drilling
- `TaskList` now displays whatever is in state, so when the state changes, the list on screen changes too.


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
 