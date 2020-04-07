import React, { Component } from 'react';


class Items extends Component {

    toggleStatus = () => {
        this.props.toggleStatus(this.props.task);
    }
    deleteTask = () => {
        this.props.deleteTask(this.props.task);
    }
    onEdit = () => {
        this.props.onEdit(this.props.task);
    }
    render() {
        let { task, index } = this.props;
        return (
            <tr>
                <td>{index}</td>
                <td >{task.name}</td>
                <td className="text-center" onClick={this.toggleStatus}>
                    <span className={task.status === true ? "label hover label-success" : "label hover label-danger"}>
                        {task.status === true ? 'Activate' : 'Hide  '}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEdit}>
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                        <span className="fa fa-trash mr-5"></span>Delete
            </button>
                </td>
            </tr>


        );
    }
}
export default Items;
