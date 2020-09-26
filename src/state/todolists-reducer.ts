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
export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeTodoListFilterAC = ( filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',filter, id}
}

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState :Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = state.filter((t) => t.id !== action.id)
            return newState
        }
        case 'ADD-TODOLIST': {
            return [ {id: action.todoListId, title: action.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}