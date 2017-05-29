import React from 'react';
import { connect } from 'react-redux';

import TodoList from './TodoList';
import { toggleTodoItem } from '../actions';


const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(todo => {
                return todo.completed
            });
        case 'active':
            return todos.filter(todo => {
                return !todo.completed
            });
        default:
            return todos;
    };
};

const mapStateToTodoListProps = (state, ownParams) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            ownParams.filter
        )
    };
};

const mapDispatchtoTodoListProps = (dispatch) => {
    return {
        onClickTodo: (id) => dispatch(toggleTodoItem(id))
    };
};

const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchtoTodoListProps
)(TodoList);

export default VisibleTodoList;
