import React from 'react';
import TaskFilter from '../TaskFilter';

import './Footer.css'

const Footer = ({getComplited, filter, onFilterChange, deleteCompletedItems}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{getComplited} items left</span>
            <TaskFilter filter={filter} onFilterChange={onFilterChange}/>
            <button className="clear-completed" onClick={deleteCompletedItems}>Clear completed</button>
        </footer>
    )
}

export default Footer