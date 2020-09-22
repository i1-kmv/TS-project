import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState(false);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError(true)
        }
        props.addItem(newTaskTitle);
        setNewTaskTitle("")

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label="Enter the title"
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
            />
            <Button
                size={'small'}
                onClick={addTask}
                variant={"contained"}
                color={"primary"}
            >
                +
            </Button>
            {error && <div className="error-message">Field is required</div>}
        </div>
    )
}