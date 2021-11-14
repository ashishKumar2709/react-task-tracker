import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';
import './index.css'



function App() {

  const[showAddTask, setShowAddTask] =useState(false)

  const [tasks, setTasks] = useState([])
  
  useEffect(()=>{
   const getTasks = async() => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
   }
    getTasks()
  },[])

//Fetch Task
const fetchTasks = async() => {
  const response = await fetch('http://localhost:5000/tasks')
  const data = await response.json()
  console.log(data)
  return data
}

//Fetch task for reminder

const fetchTask = async(id) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await response.json()
  console.log(data)
  return data
}
  //Add Task

   const addTask = async (task) => {

    const response = await fetch("http://localhost:5000/tasks",{ 
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data =await response.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1 //adding task without server

    // const newTask = {id, ...task}

    // setTasks([...tasks, newTask])

   }
     

    //Delete a task

    const DeleteTask = async(id) =>{
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE',
      })
      setTasks(tasks.filter(tasks => tasks.id!==id))
    }

    //Toggle Reminder

    const toggleReminder = async (id) => {

      const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method:'PUT',
        headers: {
          'Content-type': 'application/json'},
        body: JSON.stringify(updTask)
      })

      const data = await response.json()

      setTasks(tasks.map((tasks) => 
        tasks.id===id ? {...tasks, reminder: data.reminder} : tasks
      ))
      
    }

  return (
    <Router>
    <div className="Container">
      <Header onAdd= {() => setShowAddTask(!showAddTask)}showAdd = {showAddTask}/>
      
     <Route path='/' exact render = {(props)=>(
       <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length>0 ? <Tasks tasks={tasks} 
          onDelete={DeleteTask} 
          onToggle={toggleReminder}/> : 
          <h3>No tasks to show</h3>}
       </>
     )}/>
     <Route path ='/about' component={About} />
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
