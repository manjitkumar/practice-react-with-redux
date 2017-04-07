export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';
export const SET_TODO_VISIBILITY_FILTER = 'SET_TODO_VISIBILITY_FILTER';


export const VisibilityFiltersList = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodoItem = (text) => {
    console.log('called addTodoItem');
    return {
        type: ADD_TODO_ITEM,
        text: text
    };
}

export const toggleTodoItem = (itemId) => {
    return {
        type: TOGGLE_TODO_ITEM,
        item_id: item_id
    };
}

export const setTodoVisibililtyFilter = (filter) => {
    return {
        type: SET_TODO_VISIBILITY_FILTER,
        filter: filter
    };
}
