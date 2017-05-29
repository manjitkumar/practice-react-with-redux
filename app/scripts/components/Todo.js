import React from 'react';
import { connect } from 'react-redux';


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

export default Todo;
