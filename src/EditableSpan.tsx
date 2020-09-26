import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, changeEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)


    const activateEditMode = () => {
        changeEditMode(true)
        setTitle(props.value)
    }
    const  deactivateEditMode = () => {
        changeEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}