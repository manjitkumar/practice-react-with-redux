import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoAppReducer from './reducers';
import { fetchTodos } from './apis';


const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prevState', 'color: grey', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c nextState', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    };
};

const configureStore = () => {

    // create store with root reducer and persisted state
    // from local storage
    const store = createStore(
        todoAppReducer,
    );

    // wrap store.dispatch to log changes on every call
    // to store's dispatch method.
    store.dispatch = addLoggingToDispatch(store);

    // wrap store.dispatch to make it aware of promises
    // returned in action creators and handle promises.
    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
}

export default configureStore;
