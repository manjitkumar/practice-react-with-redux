import { VisibilityFiltersList } from '../actions';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import * as fromTodos from './todos';
import todos from './todos';


const todoAppReducer = combineReducers({
    todos,
});

export default todoAppReducer;


export const getVisibleTodos = (state, filter) => {
    // this is a selector function to get a selected part
    // state and pass to other function who doesn't need
    // to know about state structure.
    return fromTodos.getVisibleTodos(state.todos, filter);
};
