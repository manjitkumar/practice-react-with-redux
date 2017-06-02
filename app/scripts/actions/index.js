import { v4 } from 'node-uuid';

export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';
export const SET_TODO_VISIBILITY_FILTER = 'SET_TODO_VISIBILITY_FILTER';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';


export const VisibilityFiltersList = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodoItem = (text) => {
    return {
        type: ADD_TODO_ITEM,
        id: v4(),
        text,
    };
};

export const toggleTodoItem = (id) => {
    return {
        type: TOGGLE_TODO_ITEM,
        id,
    };
};

export const setTodoVisibililtyFilter = (filter) => {
    return {
        type: SET_TODO_VISIBILITY_FILTER,
        filter,
    };
};

export const receiveTodos = (filter, response) => {
    return {
        type: RECEIVE_TODOS,
        filter,
        response,
    }
}
