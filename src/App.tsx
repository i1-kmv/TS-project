import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


function App() {

    const tasks1 = [
        {id: 1, title:"HTML & CSS", isDone: true},
        {id: 2, title:"JS", isDone: true},
        {id: 3, title:"ReactJS", isDone: true},
    ]

    const tasks2 = [
        {id: 1, title:"Angular", isDone: true},
        {id: 2, title:"VueJS", isDone: true},
        {id: 3, title:"Flutter", isDone: true},
    ]




    return (
        <div className="App">
            <TodoList title={"what to learn"} tasks={tasks1}/>
            <TodoList title={"what to learn else"} tasks={tasks2}/>

        </div>
    );
}


export default App;
