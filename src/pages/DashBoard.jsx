import { useState, useEffect ,useContext} from "react"
import ProfileIcon from "../components/ProfileIcon"
import TaskCard from "../components/TaskCard"



export default function DashBoard() {
  const [searchBtn, setSearchBtn] = useState(false)
  const [newTask, setNewTask] = useState(false)
  const [search , setSearch] = useState("")
  const [formData, setFormData] = useState({
    id : Date.now(),
    name: "",
    startDay: "",
    dueDate: "",
    priority: "",
    status: "Pending"
  })

  const [todos,setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter(task => task.id !== id))
  }
  function handleSerch(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    // Add Todo item to localStorage
    setTodos([...todos,formData])

    setFormData({
      title: "",
      startDate: "",
      dueDate: "",
      priority: "",
      status: "Pending"
    })
    
    setNewTask(false)
  }
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevForm) => {
      return { ...prevForm, [name]: value }
    })
  }

  const tasksElement = todos.filter((item) => {
    const name = item?.name?.toLowerCase() || "";
    const query = (search || "").toLowerCase().trim();
    return query === "" ? true : name.includes(query);
  }).map((task, index) => <TaskCard key={index} task={task} onDelete={handleDelete}/>);

  return (
    <>
      <section className="dashboard-section">
        {/* Header Profile */}
        <ProfileIcon />

        <div className="dashboard-main-content">
          <div className="tasks-section">
            <div className="tasks-header">
              <h1>Tasks</h1>
              <div className="task-search">
                <form onSubmit={handleSerch}>
                  {searchBtn && <input onChange={handleSerch} type="text" name="" id="" placeholder="Search Tasks..."/>}
                  <button><i className="fa-solid fa-search" onClick={() => setSearchBtn(searchBtn => !searchBtn)}></i></button>
                </form>
                <button onClick={() => setNewTask(true)}>Add Task</button>
              </div>
            </div>
            <table className="tasks-wrapper">
              <tbody >
                <tr className="tasks-title">
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
                {/* Load all tasks here */}
                {tasksElement}
              </tbody>
            </table>
            {newTask && <section className="add-task">
              <div className="add-task-header">
                <h1>Add new task</h1>
                <i className="fa-solid fa-close" onClick={() => setNewTask(false)}></i>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="new-task-title new-task-inputs">
                  <div className="task-info">
                    <i className="fa-solid fa-pen"></i>
                    <p>Title</p>
                  </div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Add title..." required/>
                </div>
                <div className="new-task-date new-task-inputs">
                  <div className="task-info">
                    <i className="fa-solid fa-calendar"></i>
                    <p>Date</p>
                  </div>
                  <input type="date" name="startDay" value={formData.startDay} onChange={handleChange} placeholder="Start Date" required/>
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" required/>
                </div>
                <div className="new-task-priority new-task-inputs">
                  <div className="task-info">
                    <i className="fa-solid fa-arrow-up-wide-short"></i>
                    <p>Priority</p>
                  </div >
                  <div className="priority-level">
                    <label >
                    <input type="radio" name="priority" value="Low" onChange={handleChange} hidden />Low
                  </label>
                  <label >
                    <input type="radio" name="priority" value="Medium" onChange={handleChange} hidden />Medium
                  </label>
                  <label >
                    <input type="radio" name="priority" value="High" onChange={handleChange} hidden />High
                  </label>
                  </div>
                </div>
                <div className="form-btn">
                  <button onClick={() => setNewTask(false)}>Cancel</button>
                  <button >Save</button>
                </div>
              </form>
            </section>}
          </div>
        </div>
      </section>
    </>
  )
}