import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


function App() {




   let [tasks, setTasks] = useState([
       {id: 1, title:"HTML & CSS", isDone: true},
       {id: 2, title:"JS", isDone: true},
       {id: 3, title:"ReactJS", isDone: true},
   ])



    const onDeleteTask = (id: number) => {
       let filteredTasks = tasks.filter(t => (t.id !== id))
        setTasks(filteredTasks)
    }



    return (
        <div className="App">
            <TodoList title={"what to learn"}
                      tasks={tasks}
                      onDeleteTask={onDeleteTask}
            />
        </div>
    );
}


export default App;
