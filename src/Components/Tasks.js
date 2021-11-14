import React from 'react'
import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {tasks.map(tasks =>{
               return <Task 
               key={tasks.id} 
               task={tasks} 
               onDelete={()=>onDelete(tasks.id)} 
               onToggle={onToggle}
               />
            })}
        </>
    )
}

export default Tasks
