import React from 'react';
import ReactDom from 'react-dom';


import styles from './stylesheets/main.css';
import configureStore from './scripts/configureStore';
import Root from './scripts/components/Root';


const store = configureStore();

ReactDom.render(
    <Root store={store} />,
    document.getElementById('app')
);
