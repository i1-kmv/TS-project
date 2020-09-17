import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    onDeleteTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    onAddTask: (newTaskTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)  => {
        if (e.charCode === 13) {
            props.onAddTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        props.onAddTask(newTaskTitle);
        setNewTaskTitle("")
    }

    const onAllFilter = () =>  props.changeFilter("all")
    const onActiveFilter = () =>  props.changeFilter("active")
    const onCompletedFilter = () => props.changeFilter("completed")


    let tasks = props.tasks.map(task => {

        const onRemoveTask = () => {
            props.onDeleteTask(task.id)
        }

        return <li key={task.id}><input
            type="checkbox"
            checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={onRemoveTask}>x
            </button>
        </li>

    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+
            </button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button
                onClick={onAllFilter}>All
            </button>
            <button
                onClick={onActiveFilter}>Active
            </button>
            <button
                onClick={onCompletedFilter}>Completed
            </button>
        </div>
    </div>
}