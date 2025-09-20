
export default function TaskCard({task, onDelete}) {
  const priorityColor = task.priority === "High" ? "red" : task.priority === "Medium" ? "yellow" : "blue"
  const statusColor = task.status === "Pending" ? "yellow" : "green"
 
  return (
    <>
      <tr className="task-card">
        <td className="task-name"><p>{task.name}</p></td>
        <td className="task-startDay"><p>{task.startDay}</p></td>
        <td className="task-dueDate"><p>{task.dueDate}</p></td>
        <td className={`task-priority `}><p className={`${priorityColor}`}>{task.priority}</p></td>
        <td className={`task-status`}><p className={`${statusColor}`}>{task.status}</p></td>
        <td className="task-close" onClick={() => onDelete(task.id)}><i className="fa-solid fa-close"></i></td>
      </tr>
    </>
  )
}
