import React, {useRef} from 'react';

import './NewTodo.css';

type NewTodoProps = {
    onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = props => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
    }
    return (
        <form onSubmit={todoSubmitHandler}>
            <div className="form-control">
                <label>Todo text</label>
                <input type="text" id="todo-text" ref={textInputRef} />
            </div>
            <div className="form-control">
                <input type="submit" value="ADD TODO" />
            </div>
        </form>
           );
}

export default NewTodo;
