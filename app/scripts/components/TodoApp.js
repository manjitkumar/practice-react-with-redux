import React from 'react';

import { AddTodo } from './Todo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';


const TodoApp = ({ params }) => {
    return(
        <div>
            <AddTodo />
            <VisibleTodoList
                filter={params.filter || 'all'}
            />
            <Footer />
        </div>
    );
};

export default TodoApp;
