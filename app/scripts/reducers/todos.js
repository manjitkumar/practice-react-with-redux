import { combineReducers } from 'redux';
import todo from './todo';


const byId = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_TODO_ITEM':
        case 'TOGGLE_TODO_ITEM':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO_ITEM':
            return [ ...state, action.id ];
        default:
            return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});

const getAllTodos = (state) => {
    return state.allIds.map((i) => state.byId[i]);
};

export const getVisibleTodos = (state, filter) => {
    const allTodos = getAllTodos(state);
    switch(filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter(todo => {
                return todo.completed
            });
        case 'active':
            return allTodos.filter(todo => {
                return !todo.completed
            });
        default:
            return allTodos;
    };
};


export default todos;
