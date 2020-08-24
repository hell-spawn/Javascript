import React, {useState} from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import Todo from './models/Todo.model';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const todoAddHandler = (text: string) => {
        setTodos( prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}]);
    };

    const todoDeleteHandler = (id: string) => {
        setTodos( prevTodos =>{
            return prevTodos.filter(todo => todo.id !== id);
              });
    };

    return (
            <div className="App">
                <NewTodo onAddTodo={todoAddHandler}  />
                <TodoList items={todos}  onDeleteTodo={todoDeleteHandler} />
            </div>
           );
}

export default App;
