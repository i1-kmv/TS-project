import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onDeleteTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    onAddTask: (newTaskTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo((props: PropsType) => {

    const onAllFilter = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id])
    const onActiveFilter = useCallback( () => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedFilter = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const onAddTask = useCallback((title: string) => {
        props.onAddTask(title, props.id)
    }, [ props.onAddTask, props.id])

    const changeTodoListTitleHandler = useCallback((newValue: string) => {
        props.changeTodoListTitle(newValue, props.id)
    },[props.id,   props.changeTodoListTitle])

    let tasksForTodoList = props.tasks

    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }

    return  <div>
        <h3><EditableSpan value={props.title} onChange={changeTodoListTitleHandler}/>
            <IconButton onClick={removeTodoList} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={onAddTask}/>
        <ul>
            {
                props.tasks.map(task => <Task
                    task={task}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    onDeleteTask={props.onDeleteTask}
                    todoListId={props.id}
                    key={task.id}
                />)
            }
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
})

