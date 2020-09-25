import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, changeEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)


    const activateEditMode = () => {
        changeEditMode(true)
    }
    const  deactivateEditMode = () => {
        changeEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus={true} onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}