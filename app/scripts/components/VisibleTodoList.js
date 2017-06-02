import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TodoList from './TodoList';
import { toggleTodoItem } from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../apis';


class VisibleTodoList extends React.Component {

    componentDidMount() {
        fetchTodos(this.props.filter).then((todos) => {
            console.log(this.props.filter, todos);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.filter != prevProps.filter){
            fetchTodos(this.props.filter).then((todos) => {
                console.log(this.props.filter, todos);
            });
        }
    }

    render() {
        return <TodoList { ...this.props } />
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
    { onClickTodo: toggleTodoItem }
)(VisibleTodoList));


export default VisibleTodoList;
