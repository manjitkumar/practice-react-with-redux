import React from 'react';
import ReactDom from 'react-dom';

import Root from './scripts/components/Root';
import configureStore from './scripts/configureStore';

import styles from './stylesheets/main.css';


const store = configureStore();

ReactDom.render(
    <Root store={store} />,
    document.getElementById('app')
);
