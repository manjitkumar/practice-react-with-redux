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

const Link = (props) => {
    if (props.active) {
        return <span>{props.children}</span>
    }
    return (
        <a href='#' onClick={(e) => {
            e.preventDefault();
            props.onClick();
        }}>
        {props.children}
        </a>
    );
}

class FilterLink extends React.Component {
    // This is a container component.

    componentDidMount() {
        this.unsubscribe = todoAppStore.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = todoAppStore.getState();

        return (
            <Link
                active={props.filter === state.visibilityFilter}
                onClick={() => todoAppStore.dispatch(
                    setTodoVisibililtyFilter(props.filter)
                )}>
            {props.children}
            </Link>
        );
    }
}

const Footer = () => {
    return (
        <p>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_ALL}>
                All
            </FilterLink>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_COMPLETED}>
                Completed
            </FilterLink>
            {' '}
            <FilterLink filter={VisibilityFiltersList.SHOW_ACTIVE}>
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
            <Footer />
        </div>
    );
}
