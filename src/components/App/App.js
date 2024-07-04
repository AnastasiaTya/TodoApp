import React, {Component} from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css'

export default class App extends Component {
    state = {
      todoData: [
        {label: 'Completed task', status: true, edit: false, id: 1},
        {label: 'Editing task', status: false, edit: true, id: 2},
        {label: 'Active task', status: false, edit: false, id: 3}
      ]
    };
  
    deleteItem = (id) => {
      this.setState(({todoData}) => {
        const index = todoData.findIndex(el => el.id === id);
        const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)]
        return {
          todoData: newArr
        };
      });
    };

    toggleStatus = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex(el => el.id === id);
            const el = todoData[index]
            const newEl = {...el, status: !el.status}
            const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
            return {todoData: render}
        })
    }
  
    render () {
      return (
        <section className='todoapp'>
            <NewTaskForm />
            <section className='main'>
                <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} onToggle={this.toggleStatus}/>
                <Footer />
           </section>
        </section>
      )
    }
  }