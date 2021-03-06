import React from 'react';

import { AddTodo } from './Todo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';


const TodoApp = () => {
    return(
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
};

export default TodoApp;
