import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { todoAppReducer } from './scripts/reducers';
import { TodoApp } from './scripts/components';

import styles from './stylesheets/main.css';


// class Provider extends React.Component {
//     getChildContext() {
//         return {
//             store: this.props.store
//         };
//     }

//     render() {
//         return this.props.children;
//     }
// }

// Provider.childContextTypes = {
//     store: React.PropTypes.object
// }


ReactDom.render(
    <Provider store={createStore(todoAppReducer)}>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
);
