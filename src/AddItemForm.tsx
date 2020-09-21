import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            props. addItem(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    return (
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
    )
}