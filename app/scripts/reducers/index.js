import { VisibilityFiltersList } from '../actions';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';


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

const visibilityFilter = (state = VisibilityFiltersList.SHOW_ALL, action) => {
    switch(action.type) {
        case 'SET_TODO_VISIBILITY_FILTER':
            return action.filter;
        default :
            return state;
    }
}

export const todoAppReducer = combineReducers({
    todos,
    visibilityFilter
});
