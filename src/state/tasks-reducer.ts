import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from "./todolists-reducer";


type ActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType;

export type AddTaskActionType = {
    type: 'ADD-TASK',
    taskTitle: string,
    todoListId: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-ID',
    taskId: string,
    value: boolean,
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    taskTitle: string,
    todoListId: string
}




export const removeTaskAC = ( taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId }
}
export const addTaskAC = ( taskTitle: string, todoListId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', taskTitle ,  todoListId}
}
export const changeTaskStatusAC = ( taskId: string,value:boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-ID', taskId, value,  todoListId}
}
export const changeTaskTitleAC = ( taskId: string, taskTitle:string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, taskTitle,  todoListId}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML & CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}],
    [todoListId2]: [
        {id: v1(), title: "Books", isDone: false},
        {id: v1(), title: "Courses", isDone: true},
        {id: v1(), title: "Soft", isDone: false}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state};
            let tasks =  state[action.todoListId];
            let filteredTasks = tasks.filter(t => t.id !== action.taskId);
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
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}
