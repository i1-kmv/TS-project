import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onDeleteTask: (taskId: string,todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    onAddTask: (newTaskTitle: string,todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
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
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>{
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const onChangeTitleHandler = (newValue: string) =>{
            props.changeTaskTitle(task.id, newValue, props.id)
        }

        return <li key={task.id} className={task.isDone === true ? "done-task" : "" }>
            <input
            type="checkbox"
            checked={task.isDone}
            onChange={onChangeStatusHandler}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
            <IconButton onClick={onRemoveTask} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </li>

    })

    const onAddTask = (title: string) => {
        props.onAddTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList} aria-label="delete">
            <DeleteIcon />
        </IconButton>
        </h3>
        <AddItemForm addItem={onAddTask}/>
        <ul>
            {tasks}
        </ul>
        <div>
            <Button
                size={'small'}
                variant={props.filter === "all" ? "contained" : 'text'}
                onClick={onAllFilter}>All
            </Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === "active" ? "contained" : 'text'}
                onClick={onActiveFilter}>Active
            </Button>
            <Button
                size={'small'}
                color={'secondary'}
                variant={props.filter === "completed" ? "contained" : 'text'}
                onClick={onCompletedFilter}>Completed
            </Button>
        </div>
    </div>
}

