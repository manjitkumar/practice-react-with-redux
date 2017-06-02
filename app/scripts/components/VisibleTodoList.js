import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../apis';


class VisibleTodoList extends React.Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.filter != prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const { filter, receiveTodos } = this.props;
        fetchTodos(filter).then((todos) => {
            receiveTodos(filter, todos);
        });
    }

    render() {
        const { toggleTodoItem, ...rest } = this.props;
        return (
            <TodoList
                onClickTodo={ toggleTodoItem }
                { ...rest }
            />
        );
    }
};

const mapStateToTodoListProps = (state, { params }) => {
    const filter = params.filter || 'all';
    return {
        filter,
        todos: getVisibleTodos(
            state,
            filter
        )
    };
};

VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    actions
)(VisibleTodoList));


export default VisibleTodoList;
