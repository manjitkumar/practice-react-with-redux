import React from 'react';
import { connect } from 'react-redux';

import Footer from './Footer';

import {
    addTodoItem,
    toggleTodoItem,
    setTodoVisibililtyFilter,
    VisibilityFiltersList } from '../actions';


let AddTodo = (props) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button
                onClick={()=> {
                    props.dispatch(addTodoItem(input.value));
                    input.value = '';
                }}
            >
            Add Todo
            </button>
        </div>
    );
}

// connect takes mapStatetoProps(state) and mapDispatchToProps(dispatch)
// but if called without any args it doesn't subscribe to store but
// it passes dispatch as props to given component to callback.
AddTodo = connect()(AddTodo);

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

const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }
}

const mapDispatchtoTodoListProps = (dispatch) => {
    return {
        onClickTodo: (id) => dispatch(toggleTodoItem(id))
    }
}

const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchtoTodoListProps
)(TodoList);


export const TodoApp = (props) => {
    return(
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
}
