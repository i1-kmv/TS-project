import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [type: string]: Array<TaskType>
}


function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "what to learn", filter: "all"},
        {id: todoListId2, title: "what to buy", filter: "all"},
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => (t.id !== id))
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const onAddTask = (newTaskTitle: string, todoListId: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(t => t.id === todoListId)
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }

    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }

    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(t => t.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    let changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(t => t.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }

    }

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
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


export default App;
