import { useState } from 'react'
import AddTasks from './components/AddTasks';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import "./index.css"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Strange Movie',
      day: '23 Jan 2023 at 10am',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting Friends',
      day: '24 Jan 2023 at 4pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Shopping with family',
      day: '25 Jan 2023 at 6pm',
      reminder: true
    }
  ])

  // To delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const handleToggleReminder = (id) => {
    console.log(tasks);
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !tasks.reminder } : task))
  }

  // Add Tasks
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header onAdd={() => { setShowAddTask(!showAddTask) }} />
      {showAddTask && <AddTasks onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleReminder} />) : (<h3>No Tasks</h3>)}
    </div>
  );
}

export default App;
