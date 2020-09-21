import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onDeleteTask: (taskId: string,todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId: string) => void
    onAddTask: (newTaskTitle: string,todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: PropsType) {

    const onAllFilter = () =>  props.changeFilter("all", props.id)
    const onActiveFilter = () =>  props.changeFilter("active", props.id)
    const onCompletedFilter = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => {props.removeTodoList(props.id)}

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

    const onAddTask = (title: string) => {
        props.onAddTask(title, props.id)
    }

    return <div>
        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
        <AddItemForm addItem={onAddTask}/>
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

