import React from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css'

const App = () => {

    const todoData = [
        {label: 'Completed task', status: 'completed', id: 1},
        {label: 'Editing task', status: 'editing', id: 2},
        {label: 'Active task', status: undefined, id: 3}
    ]

    return (
        <section className='todoapp'>
            <NewTaskForm />
            <section className='main'>
                <TaskList todos={todoData}/>
                <Footer />
            </section>
        </section>
    );
};

export default App;