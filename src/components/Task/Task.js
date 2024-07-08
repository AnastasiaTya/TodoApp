import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types';

import './Task.css'


export default class Task extends Component {
    render () {
        const {label, onDeleted, onToggle, status, onEdit, created} = this.props;

        const timeAgo = formatDistanceToNow(created, {includeSeconds: true});

        return (
            <div className="view">
                <input className="toggle" type="checkbox" onChange={onToggle} checked={status}/>
                <label>
                    <span className="description">{label}</span>
                    <span className="created">created {timeAgo} ago</span>
                </label>
                <button className="icon icon-edit" onClick={onEdit}></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        )
    };
};

Task.defaultProps = {
    status: false,
    label: '',
    onDeleted: () => {},
    onToggle: () => {},
    onEdit: () => {}
}

Task.propTypes = {
    status: PropTypes.bool,
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggle: PropTypes.func,
    onEdit: PropTypes.func
}