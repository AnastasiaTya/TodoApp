import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

function TaskList({ todos, onDeleted, onToggle, onEdit, changeLabel }) {
  const elements = todos.map((item) => {
    const { id, status, edit, label, created, error } = item

    const changeClass = () => {
      let classList = 'todo-item '
      if (edit) {
        classList += 'editing'
      }
      if (status) {
        classList += 'completed'
      }
      return classList
    }
    const headleSubmit = (e, identifier) => {
      e.preventDefault()
      onEdit(identifier)
    }

    const heandleChange = (e, identifier) => {
      const text = e.target.value
      changeLabel(text, identifier)
    }

    return (
      <li key={id} className={changeClass()}>
        <Task
          key={id}
          onDeleted={() => onDeleted(id)}
          onToggle={() => onToggle(id)}
          status={status}
          onEdit={() => onEdit(id)}
          label={label}
          created={created}
        />
        {edit && (
          <form onSubmit={(e) => headleSubmit(e, id)}>
            <input type="text" className="edit" value={label} onChange={(e) => heandleChange(e, id)} />
            {error && <div className="error">Added text</div>}
          </form>
        )}
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  // todos: [],
  onEdit: () => {},
  changeLabel: () => {},
  onDeleted: () => {},
  onToggle: () => {},
}

TaskList.propTypes = {
  // todos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onEdit: PropTypes.func,
  changeLabel: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggle: PropTypes.func,
}

export default TaskList
