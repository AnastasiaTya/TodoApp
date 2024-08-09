import { useState } from 'react'
import './NewTaskForm.css'

export default function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input type="text" className="new-todo" placeholder="Task" onChange={onLabelChange} value={label} />
        <input
          type="number"
          step={1}
          min={0}
          max={120}
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinChange}
          value={min}
        />
        <input
          type="number"
          step={1}
          min={0}
          max={60}
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          value={sec}
        />
        <input type="submit" className="new-todo-form__button" />
      </form>
    </header>
  )
}
