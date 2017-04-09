import React from 'react';

import {
    addTodoItem,
    toggleTodoItem,
    setTodoVisibililtyFilter,
    VisibilityFiltersList } from '../actions';

import { todoAppStore } from '../../';


const Todo = (props) => {
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


const FilterLink = (props) => {
    if (props.filter === props.currentFilter) {
        return <span>{props.children}</span>
    }

    return (
        <a href='#' onClick={(e) => {
            e.preventDefault();
            todoAppStore.dispatch(setTodoVisibililtyFilter(props.filter))
        }}>
        {props.children}
        </a>
    );
}

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(todo => {
                return todo.completed
            });
        case 'SHOW_ACTIVE':
            return todos.filter(todo => {
                return !todo.completed
            });
        default:
            return todos;
    }
}


export class TodoApp extends React.Component {
    render() {

        let visibleTodos = getVisibleTodos(
            this.props.todos,
            this.props.visibilityFilter
        );

        return(
            <div>
                <div>
                    <input ref={node => {
                        this.input = node;
                    }}/>
                    <button
                        onClick={()=>{
                            if (this.input.value === ''){
                                return
                            }
                            todoAppStore.dispatch(addTodoItem(this.input.value));
                            this.input.value = '';
                        }}
                    > Add Todo </button>
                </div>
                <TodoList listItems={visibleTodos} />
                <p>
                {' '}
                <FilterLink filter={VisibilityFiltersList.SHOW_ALL} currentFilter={this.props.visibilityFilter} >
                    All
                </FilterLink>
                {' '}
                <FilterLink filter={VisibilityFiltersList.SHOW_COMPLETED} currentFilter={this.props.visibilityFilter}>
                    Completed
                </FilterLink>
                {' '}
                <FilterLink filter={VisibilityFiltersList.SHOW_ACTIVE} currentFilter={this.props.visibilityFilter}>
                    Active
                </FilterLink>
                </p>
            </div>
        );
    }
}
