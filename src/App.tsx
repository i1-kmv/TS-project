import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

   let [tasks, setTasks] = useState<Array<TaskType>>([
       {id: v1(), title:"HTML & CSS", isDone: false},
       {id: v1(), title:"JS", isDone: true},
       {id: v1(), title:"ReactJS", isDone: false}
   ])




    const onDeleteTask = (id: string) => {
       let filteredTasks = tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }

    const onAddTask = (newTaskTitle: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(t => t.id === todoListId)
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }

    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }


    setTasks([...tasks])
    }


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "what to learn", filter: "active"},
        {id: v1(), title: "what to buy", filter: "completed"},
    ])

    return (
        <div className="App">
            {
                todoLists.map((t) => {

                    let tasksForTodolist = tasks

                    if (t.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone)
                    }
                    if (t.filter === "active") {
                        tasksForTodolist = tasks.filter(t => !t.isDone)
                    }

                    return <TodoList title= {t.title}
                                     key={t.id}
                                     id={t.id}
                                     tasks={tasksForTodolist}
                                     onDeleteTask={onDeleteTask}
                                     changeFilter={changeFilter}
                                     onAddTask={onAddTask}
                                     changeTaskStatus={changeStatus}
                                     filter = {t.filter}
                    />
                })
            }

        </div>
    );
}


export default App;
