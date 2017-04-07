import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

import { todoAppReducer } from './scripts/reducers';
import { TodoApp } from './scripts/components';


export const todoAppStore = createStore(todoAppReducer);

const render = () => {
    ReactDom.render(
        <TodoApp />,
        document.getElementById('app')
    );
}

todoAppStore.subscribe(render);
render();
