import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import todoAppReducer from './reducers';
import { loadState, saveState } from './localStorage';



const configureStore = () => {
    // load persisted state from local storage
    const persistedState = loadState();

    // create store with root reducer and persisted state
    // from local storage
    const store = createStore(
        todoAppReducer,
        persistedState
    );

    // subscibe to store changes to save updated state
    // in local storage only once a second using throttle
    store.subscribe(throttle(() => {
        saveState(store.getState());
    }), 1000);

    return store;
}

export default configureStore;
