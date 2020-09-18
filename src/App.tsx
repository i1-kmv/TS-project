import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"


function App() {

   let [tasks, setTasks] = useState<Array<TaskType>>([
       {id: v1(), title:"HTML & CSS", isDone: false},
       {id: v1(), title:"JS", isDone: true},
       {id: v1(), title:"ReactJS", isDone: false}
   ])

    let [filter, setFilter] = useState<FilterValuesType>("all")


    let tasksForTodolist = tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }


    const onDeleteTask = (id: string) => {
       let filteredTasks = tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }

    const onAddTask = (newTaskTitle: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }


    setTasks([...tasks])

    }






    return (
        <div className="App">
            <TodoList title={"what to learn"}
                      tasks={tasksForTodolist}
                      onDeleteTask={onDeleteTask}
                      changeFilter={changeFilter}
                      onAddTask={onAddTask}
                      changeTaskStatus={changeStatus}
            />
        </div>
    );
}


export default App;
