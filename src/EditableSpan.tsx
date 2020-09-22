import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, changeEditMode] = useState(false)
    let [title, changeTitle] = useState(props.title)
    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => changeTitle(e.currentTarget.value)

    let activateEditMode = () => {
        changeEditMode(true)

    }

    let deactivateEditMode = () => {
        changeEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} autoFocus={true} onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}