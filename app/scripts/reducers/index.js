import { VisibilityFiltersList } from '../actions';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import * as fromTodos from '../components/Todo';


const initialState = {
    visibilityFilter: VisibilityFiltersList.SHOW_ALL,
    todos : []
}


const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO_ITEM':
            return {
                id: v4(),
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO_ITEM':
            if (state.id !== action.id){
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default :
            return state;
    }
}

const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO_ITEM':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO_ITEM':
            return state.map((t) => {
                    return todo(t, action);
                });
        default :
            return state;
    }
    return state;
}


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
