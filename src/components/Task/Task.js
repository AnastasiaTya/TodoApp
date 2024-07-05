import React, {Component} from 'react';

import './Task.css'


export default class Task extends Component {
    render () {
        const {label, onDeleted, onToggle, status, onEdit} = this.props;

        return (
            <div className="view">
                <input className="toggle" type="checkbox" onChange={onToggle} checked={status}/>
                <label>
                    <span className="description">{label}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit" onClick={onEdit}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        )
    };
};
