import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'

class CheckList extends Component {

    // 检测用户是否按了回车键， 以及在调用回调函数后清除文本框的内容
    checkInputKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
            evt.target.value = '';
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" checked={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
                } />
                {task.name} { ' ' }
                <a href="#" className="checklist__task--remove"
                   onClick={
                       this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
                   } />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input
                    type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object)
};
export default CheckList;
