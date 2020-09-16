import React from "react";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    onDeleteTask: Function
    changeFilter: Function
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {



    let tasks = props.tasks.map(task => {
        return   <li><input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
            <button onClick={() => {props.onDeleteTask(task.id)}}>x</button>
        </li>

    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={() => {props.changeFilter("all")}}>All</button>
            <button onClick={() => {props.changeFilter("active")}}>Active</button>
            <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}