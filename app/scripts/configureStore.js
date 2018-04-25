import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import todoAppReducer from './reducers';
import { fetchTodos } from './apis';


const configureStore = () => {

    const middlewares = [promise];
    middlewares.push(createLogger());
    // create store with root reducer and persisted state
    // from local storage
    return createStore(
        todoAppReducer,
        applyMiddleware(...middlewares)
    );
}

export default configureStore;
