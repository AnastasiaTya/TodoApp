import React from 'react';
import Task from '../Task';

import './TaskList.css'

const TaskList = ({todos}) => {
    const elements = todos.map(item => {
        const {id, status, ...itemProps} = item

        return (
            <li key={id} className={status}>
                <Task {...itemProps} />
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


