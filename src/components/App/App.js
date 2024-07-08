import React, {Component} from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css'

export default class App extends Component {
    maxId = 100;

    state = {
      todoData: [
        this.createTodoItem('Completed task', '2024 07 07'),
        this.createTodoItem('Editing task', '2024 07 07'),
        this.createTodoItem('Active task', '2024 07 07')
      ],
      filter: 'all',
    };

    createTodoItem (label, createdTime) {
      return {
        label,
        status: false,
        edit: false,
        id: this.maxId++,
        error: false,
        created: createdTime
      }
    }

    addItem = (text) => {
      if(!text.trim()) {
        return
      }
      const newItem = this.createTodoItem(text, Date.now())
      this.setState(({todoData}) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr
        }
      })
    }

    changeLabel = (text, id) => {
      this.setState(({todoData}) =>{
        if(!text.trim()) {
          const index = todoData.findIndex(el => el.id === id);
          const el = todoData[index]
          const newEl = {...el, error: true, label: text}
          const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
          return {todoData: render}
        } else {
          const index = todoData.findIndex(el => el.id === id);
          const el = todoData[index]
          const newEl = {...el, label: text, error: false}
          const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
          return {todoData: render}
        }
        
      })
    }
  
    deleteItem = (id) => {
      this.setState(({todoData}) => {
        const index = todoData.findIndex(el => el.id === id);
        const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)]
        return {
          todoData: newArr
        };
      });
    };

    deleteCompletedItems = () => {
      this.setState(({todoData}) => {
        const activeItems = todoData.filter(item => !item.status)
        return {
          todoData: activeItems
        }
      })
    }

    toggleStatus = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex(el => el.id === id);
            const el = todoData[index]
            const newEl = {...el, status: !el.status}
            const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
            return {todoData: render}
        })
    }

    get getComplited() {
        const doneCount = this.state.todoData.filter(el => el.status).length;
        const todoCount = this.state.todoData.length - doneCount;
        return todoCount
    }

    filter(items, filter) {
      switch(filter) {
        case 'all': 
          return items;
        case 'active': 
          return items.filter((item) => !item.status);
        case 'completed':
          return items.filter((item) => item.status);
        default: 
          return items;
      };
    };

    onFilterChange = (filter) => {
      this.setState({filter})
    }

    editItem = (id) => {
      this.setState(({todoData}) => {
        const index = todoData.findIndex(el => el.id === id);
        const el = todoData[index]
        if(el.error) {
          return
        }
        const newEl = {...el, edit: !el.edit}
        const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
        return {todoData: render}
    })
    }
  
    render () {
      const {todoData, filter} = this.state
      const visibleItems = this.filter(todoData, filter)
      return (
        <section className='todoapp'>
            <NewTaskForm onItemAdded={this.addItem} />
            <section className='main'>
                <TaskList todos={visibleItems} onDeleted={this.deleteItem} onToggle={this.toggleStatus} 
                  onEdit={this.editItem} changeLabel={this.changeLabel} />
                <Footer getComplited={this.getComplited} filter={filter}
                  onFilterChange={this.onFilterChange}
                  deleteCompletedItems={this.deleteCompletedItems} />
           </section>
        </section>
      )
    }
  }