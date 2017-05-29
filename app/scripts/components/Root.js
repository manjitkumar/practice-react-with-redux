import React from 'react';
import { TodoApp } from '.';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';


const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/(:filter)" component={TodoApp} />
            </Router>
        </Provider>
    );
};

export default Root;
