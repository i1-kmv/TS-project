import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [type: string]: Array<TaskType>
}


function AppWithReducers() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: "what to learn", filter: "all"},
        {id: todoListId2, title: "what to buy", filter: "all"},
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "HTML & CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Courses", isDone: true},
            {id: v1(), title: "Soft", isDone: false}
        ]
    })


    const onDeleteTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    const onAddTask = (newTaskTitle: string, todoListId: string) => {
        const action = addTaskAC(newTaskTitle, todoListId)
        dispatchToTasksReducer(action)
    }


    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle,todoListId)
        dispatchToTasksReducer(action)
    }


    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatchToTodoListsReducer(action)

    }

    let removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    let changeTodoListTitle = (id: string, newTitle: string) => {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatchToTodoListsReducer(action)

    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        NEWS
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((t) => {

                            let tasksForTodoList = tasksObj[t.id]

                            if (t.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (t.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            title={t.title}
                                            key={t.id}
                                            id={t.id}
                                            tasks={tasksForTodoList}
                                            onDeleteTask={onDeleteTask}
                                            changeFilter={changeFilter}
                                            onAddTask={onAddTask}
                                            changeTaskStatus={changeStatus}
                                            filter={t.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}


export default AppWithReducers;
