import React from 'react';
import Todo from './Todo';


const TodoList = (props) => {
    const listItems = props.todos.map((todo) => {
        return <Todo
            key={todo.id}
            {...todo}
            onClick={() => props.onClickTodo(todo.id)} />
    });
    return (
        <ul>
            {listItems}
        </ul>
    );
};

export default TodoList;
