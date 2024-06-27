import React from 'react';
import TaskFilter from '../TaskFilter';

import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TaskFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer