import {TasksStateType} from "../App";
import {v1} from "uuid";


type ActionsType = addTaskActionType | removeTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType;

export type addTaskActionType = {
    type: 'ADD-TASK',
    taskTitle: string,
    todoListId: string
}
export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-ID',
    taskId: string,
    value: boolean,
    todoListId: string
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    taskTitle: string,
    todoListId: string
}


export const removeTaskAC = ( taskId: string, todoListId: string): removeTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId }
}
export const addTaskAC = ( taskTitle: string, todoListId: string): addTaskActionType => {
    return { type: 'ADD-TASK', taskTitle ,  todoListId}
}
export const changeTaskStatusAC = ( taskId: string,value:boolean, todoListId: string): changeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-ID', taskId, value,  todoListId}
}
export const changeTaskTitleAC = ( taskId: string, taskTitle:string, todoListId: string): changeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, taskTitle,  todoListId}
}

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state};
            let tasks =  state[action.todoListId];
            let filteredTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy ;
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.taskTitle, isDone: false}
            let stateCopy = {...state};
            let tasks = state[action.todoListId];
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy
        }
        case 'CHANGE-TASK-ID': {
            const stateCopy = {...state}
            let tasks = state[action.todoListId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.value;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = state[action.todoListId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.taskTitle;
            }
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}