import React from 'react';

import { addTodoItem } from '../actions';
import { todoAppStore } from '../../';


const Todo = (props) => {
    return (
        <div>
            <li> { props.text } </li>
        </div>
    );
}

const TodoList = (props) => {
    const listItems = props.listItems.map((item) => {
        return <Todo key={item.id} text={item.text} />
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export class TodoApp extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <input ref={node => {
                        this.input = node;
                    }}/>
                    <button
                        onClick={()=>{
                            todoAppStore.dispatch(addTodoItem(this.input.value));
                            this.input.value = '';
                        }}
                    > Add Todo </button>
                </div>
                <TodoList listItems={todoAppStore.getState().todos} />
            </div>
        );
    }
}
