import React from 'react';
import Task from '../Task';

import './TaskList.css'

const TaskList = ({todos, onDeleted, onToggle}) => {
    const elements = todos.map(item => {
        const {id, status, ...itemProps} = item

        return (
            <li key={id} className={status ? 'completed' : ''}>
                <Task {...itemProps} onDeleted={() => onDeleted(id)} onToggle={() => onToggle(id)} status={status} />
                <input type="text" className="edit" value="Editing task" onChange={e => e.target} />
            </li> 
        )
    })
    return (
        <ul className='todo-list'>
            {elements}
        </ul>
    )
}

export default TaskList


