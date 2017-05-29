import React from 'react';
import { connect } from 'react-redux';

import TodoList from './TodoList';


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

export default VisibleTodoList;
