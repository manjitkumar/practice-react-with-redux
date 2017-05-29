import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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

const mapStateToTodoListProps = (state, { params }) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            params.filter
        )
    };
};

// const mapDispatchtoTodoListProps = (dispatch) => {
//     return {
//         onClickTodo: (id) => dispatch(toggleTodoItem(id))
//     };
// };

const VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    { onClickTodo: toggleTodoItem }
)(TodoList));

export default VisibleTodoList;
