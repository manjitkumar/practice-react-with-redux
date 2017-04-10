import React from 'react';
import { connect } from 'react-redux';

import {
    addTodoItem,
    toggleTodoItem,
    setTodoVisibililtyFilter,
    VisibilityFiltersList } from '../actions';


let nextTodoId = 0;


let AddTodo = (props) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button
                onClick={()=> {
                    props.dispatch(addTodoItem(nextTodoId++, input.value)
                );
                input.value = '';
            }}>
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
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { store } = this.context;
        const props = this.props;
        const state = store.getState();

        return (
            <Link
                active={props.filter === state.visibilityFilter}
                onClick={() => store.dispatch(
                    setTodoVisibililtyFilter(props.filter)
                )}>
            {props.children}
            </Link>
        );
    }
}

FilterLink.contextTypes = {
    store: React.PropTypes.object
};


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

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onClickTodo: (id) => dispatch(toggleTodoItem(id))
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchtoProps
)(TodoList);

// class VisibleTodoList extends React.Component {
//     // This is a container component.

//     componentDidMount() {
//         const { store } = this.context;
//         this.unsubscribe = store.subscribe(() => {
//             this.forceUpdate();
//         });
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }

//     render() {
//         const { store } = this.context;
//         let props = this.props;
//         let state = store.getState();

//         return (
//             <TodoList
//                 onClickTodo={id => {

//                 );
//             }}/>
//         );
//     }
// }

// VisibleTodoList.contextTypes = {
//     store: React.PropTypes.object
// };


export const TodoApp = (props) => {
    return(
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
}
