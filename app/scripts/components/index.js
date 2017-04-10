import React from 'react';

import {
    addTodoItem,
    toggleTodoItem,
    setTodoVisibililtyFilter,
    VisibilityFiltersList } from '../actions';

import { todoAppStore } from '../../';



const AddTodo = (props) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button
                onClick={() => { props.onAddClick(input.value);
                input.value = '';
            }}>
            Add Todo
            </button>
        </div>
    );
}

const Todo = (props) => {
    return (
        <li onClick={props.onClick}
            style={{
            textDecoration: props.completed? 'line-through': 'none'
        }}>
        { props.text }
        </li>
    );
}

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
}

const FilterLink = (props) => {
    if (props.filter === props.currentFilter) {
        return <span>{props.children}</span>
    }

    return (
        <a href='#' onClick={(e) => {
            e.preventDefault();
            props.onClick(props.filter);
        }}>
        {props.children}
        </a>
    );
}

const Footer = (props) => {
    return (
        <p>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_ALL} onClick={props.onFilterClick} currentFilter={props.visibilityFilter} >
                All
            </FilterLink>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_COMPLETED} onClick={props.onFilterClick} currentFilter={props.visibilityFilter}>
                Completed
            </FilterLink>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_ACTIVE} onClick={props.onFilterClick} currentFilter={props.visibilityFilter}>
                Active
            </FilterLink>
            </p>
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

let nextTodoId = 0;

export const TodoApp = (props) => {
    return(
        <div>
            <AddTodo
                onAddClick={(text)=> {
                    todoAppStore.dispatch(addTodoItem(nextTodoId++, text)
                    );
                }}
            />
            <TodoList
                todos={getVisibleTodos(props.todos, props.visibilityFilter)}
                onClickTodo={id => {
                    todoAppStore.dispatch(toggleTodoItem(id)
                );
            }}/>
            <Footer
                visibilityFilter={props.visibilityFilter}
                onFilterClick={(filter) => {
                    todoAppStore.dispatch(setTodoVisibililtyFilter(filter)
                );
            }}/>
        </div>
    );
}
