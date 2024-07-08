import React from 'react';
import TaskFilter from '../TaskFilter';
import PropTypes from 'prop-types';

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

Footer.defaultProps = {
    getComplited: 0,
    filter: 'all',
    onFilterChange: () => {},
    deleteCompletedItems: () => {}
}

Footer.propTypes = {
    getComplited: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    deleteCompletedItems: PropTypes.func,
}

export default Footer