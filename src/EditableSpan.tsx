import React, {ChangeEvent, useState} from "react";

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
        ? <input value={title} onChange={onChangeTitleHandler} autoFocus={true} onBlur={deactivateEditMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}