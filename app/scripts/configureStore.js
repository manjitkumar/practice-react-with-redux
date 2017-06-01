import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoAppReducer from './reducers';
import { loadState, saveState } from './localStorage';


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

const configureStore = () => {
    // load persisted state from local storage
    const persistedState = loadState();

    // create store with root reducer and persisted state
    // from local storage
    const store = createStore(
        todoAppReducer,
        persistedState
    );

    store.dispatch = addLoggingToDispatch(store);

    // subscibe to store changes to save updated state
    // in local storage only once a second using throttle
    store.subscribe(throttle(() => {
        saveState(store.getState());
    }), 1000);

    return store;
}

export default configureStore;
