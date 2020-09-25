import {FilterValuesType, TodoListType} from "../App";
import {v1} from 'uuid';

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType;
export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const ChangeTodoListFilterAC = ( filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}



export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = state.filter((t) => t.id !== action.id)
            return newState
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(t => t.id == action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(t => t.id == action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}