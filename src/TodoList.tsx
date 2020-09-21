import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onDeleteTask: (taskId: string,todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId: string) => void
    onAddTask: (newTaskTitle: string,todoListId: string) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)  => {
        setError(false)
        if (e.charCode === 13) {
            props.onAddTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() === '') {
           return  setError(true)
        }
        props.onAddTask(newTaskTitle, props.id);
        setNewTaskTitle("")

    }

    const onAllFilter = () =>  props.changeFilter("all", props.id)
    const onActiveFilter = () =>  props.changeFilter("active", props.id)
    const onCompletedFilter = () => props.changeFilter("completed", props.id)



    let tasks = props.tasks.map(task => {

        const onRemoveTask = () => {
            props.onDeleteTask(task.id, props.id)
        }
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) =>{
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }

        return <li key={task.id} className={task.isDone === true ? "done-task" : "" }>
            <input
            type="checkbox"
            checked={task.isDone}
            onChange={onChangeStatus}
            />
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
                   className={error ? "error" : ""}
            />
            <button
                onClick={addTask}>+
            </button>
            {error && <div className="error-message">Field is required</div>}
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ''}
                onClick={onAllFilter}>All
            </button>
            <button
                className={props.filter === "active" ? "active-filter" : ''}
                onClick={onActiveFilter}>Active
            </button>
            <button
                className={props.filter === "completed" ? "active-filter" : ''}
                onClick={onCompletedFilter}>Completed
            </button>
        </div>
    </div>
}