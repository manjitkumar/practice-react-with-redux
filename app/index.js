import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { todoAppReducer, localState } from './scripts/reducers';
import { TodoApp } from './scripts/components';
import { loadState, saveState } from './scripts/localStorage';
import throttle from 'lodash/throttle';

import styles from './stylesheets/main.css';


const persistedState = loadState();
const store = createStore(
    todoAppReducer,
    persistedState
);

store.subscribe(throttle(() => {
    saveState(store.getState());
}), 1000);


ReactDom.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
);
