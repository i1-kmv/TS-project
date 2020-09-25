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
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [type: string]: Array<TaskType>
}


function AppWithRedux() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)



    const onDeleteTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    const onAddTask = (newTaskTitle: string, todoListId: string) => {
        const action = addTaskAC(newTaskTitle, todoListId)
        dispatch(action)
    }


    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle,todoListId)
        dispatch(action)
    }


    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const action = ChangeTodoListFilterAC(value, todoListId)
        dispatch(action)

    }

    let removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }

    let changeTodoListTitle = (id: string, newTitle: string) => {
        const action = ChangeTodoListTitleAC(id, newTitle)
        dispatch(action)

    }

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
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

                            let tasksForTodoList = tasks[t.id]

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


export default AppWithRedux;
