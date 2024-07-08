import React from 'react';
import Task from '../Task';
import PropTypes from 'prop-types';

import './TaskList.css'

const TaskList = ({todos, onDeleted, onToggle, onEdit, changeLabel}) => {
    const elements = todos.map(item => {
        const {id, status, edit, label, created, ...itemProps} = item
        
        const changeClass = () => {
            if(edit === true) {
                return 'editing'
            } else if(status === true) {
                return 'completed'
            } else {
                return ''
            }
        }
        const headleSubmit = (e, id) => {
            e.preventDefault()
            onEdit(id)
        }

        const heandleChange = (e, id) => {
            const text = e.target.value
            changeLabel(text, id)
        }

        return (
            <li key={id} className={changeClass()}>
                <Task {...itemProps} onDeleted={() => onDeleted(id)} onToggle={() => onToggle(id)} status={status} 
                    onEdit={() => onEdit(id)} label={label} created={created} />
                {edit && 
                    (<form onSubmit={(e) => headleSubmit(e, id)}>
                        <input type="text" className="edit" value={label} onChange={e => heandleChange(e, id)} />
                        {itemProps.error && <div className='error'>Added text</div>}
                    </form>)
                }
            </li> 
        )
    })
    return (
        <ul className='todo-list'>
            {elements}
        </ul>
    )
}

TaskList.defaultProps = {
    todos: [],
    onEdit: () => {},
    changeLabel: () => {},
    onDeleted: () => {},
    onToggle: () => {}
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onEdit: PropTypes.func,
    changeLabel: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggle: PropTypes.func
}

export default TaskList


