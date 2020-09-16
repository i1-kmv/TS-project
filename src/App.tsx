import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active"


function App() {

   let [tasks, setTasks] = useState<Array<TaskType>>([
       {id: 1, title:"HTML & CSS", isDone: true},
       {id: 2, title:"JS", isDone: false},
       {id: 3, title:"ReactJS", isDone: true},
   ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }



    const onDeleteTask = (id: number) => {
       let filteredTasks = tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <TodoList title={"what to learn"}
                      tasks={tasksForTodolist}
                      onDeleteTask={onDeleteTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
