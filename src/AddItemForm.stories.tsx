import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callBack = action("Button add was pressed in the form")

export const AddIteMFormBaseExample = (props:any) => {
    return <AddItemForm addItem={callBack}/>
}