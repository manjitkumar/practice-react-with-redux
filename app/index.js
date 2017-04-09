import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

import { todoAppReducer } from './scripts/reducers';
import { TodoApp } from './scripts/components';

import styles from './stylesheets/main.css';


export const todoAppStore = createStore(todoAppReducer);

const render = () => {
    ReactDom.render(
        <TodoApp {...todoAppStore.getState()} />,
        document.getElementById('app')
    );
}

todoAppStore.subscribe(render);
render();
