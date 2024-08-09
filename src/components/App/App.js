import { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import convertInMillisec from '../../utils/convertInMillisec'

import './App.css'

function App() {
  const [filter, setFilter] = useState('all')
  const [todoData, setTodoData] = useState([])

  const filterItem = (items, itemFilter) => {
    switch (itemFilter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.status)
      case 'completed':
        return items.filter((item) => item.status)
      default:
        return items
    }
  }

  const createTodoItem = (label, milliseconds, createdTime) => {
    const newItem = {
      label,
      milliseconds,
      status: false,
      edit: false,
      id: Date.now(),
      error: false,
      created: createdTime,
    }
    return newItem
  }

  const getComplited = () => {
    const doneCount = todoData.length ? todoData.filter((el) => el.status).length : []
    return todoData.length - doneCount
  }

  const onFilterChange = (itemFilter) => {
    setFilter(itemFilter)
  }

  const toggleStatus = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const el = prevTodoData[index]
      const newEl = { ...el, status: !el.status }
      const newTodoData = [...prevTodoData.slice(0, index), newEl, ...prevTodoData.slice(index + 1)]
      return newTodoData
    })
  }

  const blockItem = (id) => {
    setTodoData((prev) => {
      const index = prev.findIndex((el) => el.id === id)
      const el = prev[index]
      const newEl = { ...el, status: true }
      const newTodoData = [...prev.slice(0, index), newEl, ...prev.slice(index + 1)]
      return newTodoData
    })
  }

  const deleteCompletedItems = () => {
    setTodoData((prevTodoData) => {
      const activeItems = prevTodoData.filter((item) => !item.status)
      return activeItems
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const deleteItems = [...prevTodoData.slice(0, index), ...prevTodoData.slice(index + 1)]
      return deleteItems
    })
  }

  const changeLabel = (text, id) => {
    setTodoData((prevTodoData) => {
      if (!text.trim()) {
        const index = prevTodoData.findIndex((el) => el.id === id)
        const el = prevTodoData[index]
        const newEl = { ...el, error: true, label: text }
        const render = [...prevTodoData.slice(0, index), newEl, ...prevTodoData.slice(index + 1)]
        return render
      }
      const index = prevTodoData.findIndex((el) => el.id === id)
      const el = prevTodoData[index]
      const newEl = { ...el, label: text, error: false }
      const render = [...prevTodoData.slice(0, index), newEl, ...prevTodoData.slice(index + 1)]
      return render
    })
  }

  const addItem = (text, min, sec) => {
    if (!text.trim()) {
      return
    }
    const newItem = createTodoItem(text, convertInMillisec(min, sec), Date.now())
    setTodoData((prevTodoData) => {
      const newArr = [...prevTodoData, newItem]
      return newArr
    })
  }

  const timer = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const el = prevTodoData[index]
      const newEl = { ...el, milliseconds: el.milliseconds - 1000 }
      const render = [...prevTodoData.slice(0, index), newEl, ...prevTodoData.slice(index + 1)]
      return render
    })
  }

  const editItem = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const el = prevTodoData[index]
      if (el.error) {
        return prevTodoData
      }
      const newEl = { ...el, edit: !el.edit }
      const render = [...prevTodoData.slice(0, index), newEl, ...prevTodoData.slice(index + 1)]
      return render
    })
  }

  const visibleItems = filterItem(todoData, filter)

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggle={toggleStatus}
          onEdit={editItem}
          changeLabel={changeLabel}
          timer={timer}
          blockItem={blockItem}
        />
        <Footer
          getComplited={getComplited()}
          filterItem={filterItem}
          filter={filter}
          onFilterChange={onFilterChange}
          deleteCompletedItems={deleteCompletedItems}
          todos={visibleItems}
        />
      </section>
    </section>
  )
}

export default App
