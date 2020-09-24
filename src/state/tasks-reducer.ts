import {TasksStateType} from "../App";
import {v1} from "uuid";
import {settings} from "cluster";

type ActionsType = addTaskActionType | removeTaskActionType;

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


export const removeTaskAC = ( taskId: string, todoListId: string): removeTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId }
}
export const addTaskAC = ( taskTitle: string, todoListId: string): addTaskActionType => {
    return { type: 'ADD-TASK', taskTitle ,  todoListId}
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
        default:
            throw new Error("I don't understand this type")
    }
}