import React from "react";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    onDeleteTask: Function
}

type TaskType = {
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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}