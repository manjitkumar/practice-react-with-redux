import React from 'react';

import { addTodoItem, toggleTodoItem } from '../actions';
import { todoAppStore } from '../../';


const Todo = (props) => {
    console.log(props);
    return (
        <div>
            <li onClick={()=>{
                    todoAppStore.dispatch(toggleTodoItem(props.id))
                }}
                style={{
                    textDecoration: props.completed? 'line-through': 'none'
                }}>
            { props.text }
            </li>
        </div>
    );
}

const TodoList = (props) => {
    const listItems = props.listItems.map((item, idx) => {
        return <Todo key={idx} id={idx} text={item.text} completed={item.completed} />
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
