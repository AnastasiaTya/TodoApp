import React, {Component} from 'react';

import './TaskFilter.css'

export default class TaskFilter extends Component {
    buttons = [
        {name: 'all', lable: 'All'},
        {name: 'active', lable: 'Active'},
        {name: 'completed', lable: 'Completed'}
    ]    
    
    render(){
        const {filter, onFilterChange} = this.props
        const buttons = this.buttons.map(({name, lable}) => {
            const isActive = filter === name;
            const activeClass = isActive ? "selected" : '';
            return (
                <li key={name}>
                    <button className={activeClass}
                        onClick={() => onFilterChange(name)}>{lable}</button>
                </li>
            )
        })
        return (
            <ul className="filters">
                {buttons}
            </ul> 
        )
    } 
}


// return (
//     <ul className="filters">
//         <li>
//             <button className="selected">All</button>
//         </li>
//         <li>
//             <button>Active</button>
//         </li>
//         <li>
//             <button>Completed</button>
//         </li>
//     </ul> 
// )
