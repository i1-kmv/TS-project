import React from "react";
import {strict} from "assert";

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            <li><input type="checkbox" checked={true}/> <span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={true}/> <span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={false}/> <span>{props.tasks[2].title}</span></li>
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}