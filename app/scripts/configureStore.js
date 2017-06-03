import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoAppReducer from './reducers';
import { fetchTodos } from './apis';


const logger = (store) => (next) => {
    if (!console.group) {
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prevState', 'color: grey', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c nextState', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};


const promise = (store) => (next) => {
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(next);
        }
        return next(action);
    };
};

const applyMiddlewaresToStore = (store, middlewares) => {
    middlewares.slice.reverse().forEach((middleware) =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {

    // create store with root reducer and persisted state
    // from local storage
    const store = createStore(
        todoAppReducer,
    );

    const middlewares = [promise];
    middlewares.push(logger);
    store = applyMiddlewaresToStore(store, middlewares);

    return store;
}

export default configureStore;
