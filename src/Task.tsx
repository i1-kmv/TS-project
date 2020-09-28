import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "./TodoList";

type TaskPropType = {
    onDeleteTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropType) => {
    const onDeleteTask = () => {
        props.onDeleteTask(props.task.id, props.todoListId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTitleHandler =useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    },[  props.changeTaskTitle,props.task.id, props.todoListId ])

    return <div key={props.task.id} className={props.task.isDone === true ? "done-task" : ""}>
        <Checkbox
            color={'primary'}
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan value={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onDeleteTask} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </div>
})
