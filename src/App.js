import { useState, useEffect } from 'react'
import AddTasks from './components/AddTasks';
import Footer from './components/Footer';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // To delete Task
  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const handleToggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  // Add Tasks
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => { console.log(showAddTask); setShowAddTask(!showAddTask); }} showAdd={showAddTask} />
        <Routes>
          <Route exact path="/" element={
            <>
              {showAddTask && <AddTasks onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleReminder} />) : (<h3>No Tasks</h3>)}
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>

    // {/* <Router>
    // <div className='container'>
    //   <Header
    //     onAdd={() => setShowAddTask(!showAddTask)}
    //     showAdd={showAddTask}
    //   />
    //   <Routes>
    //     <Route
    //       path='/'
    //       element={
    //         <>
    //           {showAddTask && <AddTask onAdd={addTask} />}
    //           {tasks.length > 0 ? (
    //             <Tasks
    //               tasks={tasks}
    //               onDelete={deleteTask}
    //               onToggle={toggleReminder}
    //             />
    //           ) : (
    //             'No Tasks To Show'
    //           )}
    //         </>
    //       }
    //     />
    //     <Route path='/about' element={<About />} />
    //   </Routes>
    //   <Footer />
    // </div>
    // </Router> */}
  );
}

export default App;
