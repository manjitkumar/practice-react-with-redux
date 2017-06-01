import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import { toggleTodoItem } from '../actions';
import { getVisibleTodos } from '../reducers';


const mapStateToTodoListProps = (state, { params }) => {
    return {
        todos: getVisibleTodos(
            state,
            params.filter
        )
    };
};


const VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    { onClickTodo: toggleTodoItem }
)(TodoList));

export default VisibleTodoList;
