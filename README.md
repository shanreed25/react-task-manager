# React + TypeScript Task Manager

> A component that displays a list of tasks, filter them by status, and show different visual states based on task properties. The component is reusable, type-safe, and handles various task states efficiently.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── TaskFilter/
│   │   │   └── TaskFilter.tsx   # status and priority dropdowns, sends filters up with onFilterChange
│   │   ├── TaskItem/
│   │   │   └── TaskItem.tsx     # one task: title, details, status dropdown, and DELETE button
│   │   └── TaskList/
│   │       └── TaskList.tsx     # renders one TaskItem per task
│   ├── data/
│   │   └── mockTasks.ts         # 10 mock tasks used as the starting state
│   ├── types/
│   │   └── index.ts             # Task, TaskStatus, and prop interfaces
│   ├── App.css
│   ├── App.tsx                  # parent that holds the tasks and filter state
│   ├── index.css                # Tailwind import
│   └── main.tsx
```

## Component Implementation
 
- [x] Implement each component according to its interface requirements
- [X] Use proper TypeScript types and interfaces
- [X] Implement list rendering with unique keys
- [ ] Add conditional rendering based on task properties

### App
> The parent component. It owns all of the data: the list of tasks and the current filters.

- **State:** `useState<Task[]>(mockTasks)` holds the tasks. `mockTasks` is only the starting value; the real list is the `tasks` state. A second `useState` holds the filters as an object with an optional `status` and an optional `priority`.
- **Event handlers:**
  - `handleStatusChange(taskId, newStatus)` uses `map` to build a new array where the matching task gets the new status and every other task is unchanged.
  - `handleDelete(taskId)` uses `filter` to build a new array without the deleted task.
  - `handleFilterChange(newFilters)` saves the filters TaskFilter sends up.
- **Filtering:** `filteredTasks` is calculated from `tasks` and `filters` on every render and passed to TaskList.

### TaskList
> Follows the `TaskListProps` interface (`tasks`, `onStatusChange`, `onDelete`).

- Uses `tasks.map(...)` to render one `TaskItem` per task, with `key={task.id}` so React can track which item is which when a task is deleted or filtered out.
- It doesn't handle events itself. It passes `onStatusChange` and `onDelete` down to each `TaskItem` (prop drilling).
- `tasks` has a default value of `mockTasks` for testing, used only if the parent does not pass a `tasks` prop.

### TaskItem
> Follows the `TaskItemProps` interface (`task`, `onStatusChange`, `onDelete`).

- Shows the title, description, priority, and due date.
- **Priority color:** `getPriorityStyles(task.priority)` returns a Tailwind text color class for the priority line (see Visual Feedback below).
- **Status color:** `getStatusStyles(task.status)` returns Tailwind background and text color classes for the status dropdown (see Visual Feedback below).
- **Status dropdown:** a `<select>` whose value is `task.status`. Changing it calls `onStatusChange(task.id, e.target.value as TaskStatus)`. The `as TaskStatus` is needed because `e.target.value` is typed as a plain `string`.
- **DELETE button:** calls `onDelete(task.id)` through an arrow function, so it runs on click and not during render.

### TaskFilter
> Follows the `TaskFilterProps` interface (`onFilterChange`).

- **State:** each dropdown has its own `useState`, and both start as `""` (meaning "All").
- **Event handlers:** `handleStatusChange` and `handlePriorityChange` are typed as `ChangeEvent<HTMLSelectElement>`. Each one saves its new value, then calls `onFilterChange` with both filters. An empty string is converted to `undefined`, so "All" means "don't filter by this".



## List Management
 
- [X] Render the task list with proper key props
- [X] Implement filtering functionality
- [X] Handle task status changes
- [X] Implement task deletion

### Keys
> Each `TaskItem` uses `key={task.id}`. The list length changes when a task is deleted or filtered out, and React uses the key to work out which item disappeared. An index key would shift every item after the removed one, so React could match the wrong task to the wrong component.

### Filtering
> The filtered list is not stored in separate state. It is calculated from `tasks` and `filters` on every render:

- If a filter is `undefined`, `!filters.status` is `true`, so that check passes for every task.
- If a filter is set, only tasks with a matching value pass.
- Both checks must pass, so status and priority filters can be combined.

> Calculating it from the state means the filtered list can never get out of sync with the tasks. Changing a status or deleting a task updates `tasks`, which re-renders App and recalculates `filteredTasks`.

### Status changes
> `handleStatusChange` uses the updater form `setTasks(prev => ...)` and `map`, so it returns a new array and a new object for the changed task (`{...task, status: newStatus}`) instead of changing the original.

### Deletion
> `handleDelete` uses `setTasks(prev => ...)` and `filter` to return a new array without the deleted task.

| Handler | Array method | Result | Effect on the original array |
|---|---|---|---|
| `handleStatusChange` | `map` | Same length, one task replaced with an updated copy | None, a new array is created |
| `handleDelete` | `filter` | One task shorter | None, a new array is created |

## Visual Feedback
 
- [X] Show different styles based on task status and priority
- [X] Implement hover and active states
- [X] Add visual indicators for task properties

### Priority styles
> TaskItem has a helper function, `getPriorityStyles`, that takes the task's priority and returns a Tailwind class. The class is applied to the priority line with `className={getPriorityStyles(task.priority)}`.

- `Task["priority"]` is an indexed access type. It reads the type of the `priority` field from the `Task` interface (`'low' | 'medium' | 'high'`), so the function always matches the interface.
- The function runs on every render, so when a task's priority changes, its color changes with it.

### Status styles
> `getStatusStyles` works the same way for the task's status. It returns a background and a text color, which are combined with the dropdown's other classes in a template literal:

## Component Composition
 
- [X] Compose components to create a complete task management interface
- [X] Handle prop passing between components
- [X] Implement proper event handling
 
 > App owns the data and passes it where it's needed. TaskFilter and TaskList never talk to each other directly.

```
main.tsx
  └─ App                 tasks state, filters state, handlers
       ├─ TaskFilter     --onFilterChange(filters)--> App
       └─ TaskList       <--filteredTasks, onStatusChange, onDelete-- App
            └─ TaskItem  --onStatusChange(id, status) / onDelete(id)--> App
```

1. The user picks a filter in TaskFilter.
2. TaskFilter calls `onFilterChange` with the status and priority.
3. App saves the filters to state and recalculates `filteredTasks`.
4. App passes `filteredTasks` and the two handlers to TaskList, which passes the handlers down to each TaskItem.
5. When the user changes a status or clicks DELETE in TaskItem, the callback runs in App, which updates `tasks` and re-renders.

### Callbacks
- App creates `handleStatusChange`, `handleDelete`, and `handleFilterChange` and passes them down as props.
- The callbacks take plain values (`taskId`, `newStatus`, a filters object), not events. The child reads `e.target.value` itself, so App never has to deal with event types.

### Prop typing
> All props are defined as TypeScript interfaces in `src/types/index.ts` and imported with `import type`


### Reflection Questions

#### How did you ensure unique keys for your list items?
> I chose `task.id` for the key because the `id` stays the same for each task even when the list changes

#### What considerations did you make when implementing the filtering functionality?
- **Where to add the state:** Since App has the tasks state, I gave it the filter state also becasue it need both to know what to show.
- **How to handle the filters:** I first implemented in a way tha when I changed one filter the other filter would be cleared, So I combined the filter status and priority into one object, so the handlers could send both values and the only one that changes is the one that changed.

#### How did you handle state updates for task status changes?
> The status state gets updated without changing the original array using the spread operator and used functional updates so the update always uses the latest state.

### What challenges did you face when implementing conditional rendering?
> I do not think I used any conditional rendering because I did not realize we were suppose to. I did find any reason to really use it because I handled things in a different way and would have to change the code to add it and I just do not have time to do it now.