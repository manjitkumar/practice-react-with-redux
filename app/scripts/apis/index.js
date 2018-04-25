import { v4 } from 'node-uuid';


const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'This is a todo',
            completed: false
        },
        {
            id: v4(),
            text: 'This is a another todo',
            completed: false
        },
        {
            id: v4(),
            text: 'This is a completed todo',
            completed: true
        },
        {
            id: v4(),
            text: 'This is a test',
            completed: false
        },
        {
            id: v4(),
            text: 'This is a kind of todo',
            completed: true
        },

    ]
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchTodos = (filter) => {
    return delay(200)
    .then(() => {
        switch (filter) {
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter((todo) => !todo.completed);
            case 'completed':
                return fakeDatabase.todos.filter((todo) => todo.completed);
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    })
};
