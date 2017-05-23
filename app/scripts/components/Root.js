import React from 'react';
import { TodoApp } from '.';
import { Provider } from 'react-redux';


const Root = ({store}) => {
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    );
};

export default Root;
