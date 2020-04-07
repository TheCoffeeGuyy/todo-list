import React, { Component } from 'react';
import Items from './Items'
class TaskList extends Component {
    // toggleStatus = (task) => {
    //     this.props.toggleStatus(task);
    // }
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //all: -1, active:1,Hide: 0
        };
    }
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name]: value
        });

    }
    render() {
        let { tasks } = this.props // tasks = this
        // let {filterName, filterStatus} = this.state;
        let elementTasks = tasks.map((task, index) => {
            return (
                <Items
                    toggleStatus={this.props.toggleStatus}
                    index={index + 1}
                    task={task}
                    key={task.id}
                    onEdit={this.props.onEdit}
                    deleteTask={this.props.deleteTask}
                />

            );
        });
        return (
            <table className="table table-bordered table-hover mt-30">
                <thead>
                    <tr>
                        <th className="text-center">No.</th>
                        <th className="text-center">Task</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                // value={filterName}
                                onChange={this.onChange}
                                type="text"
                                className="form-control"
                                name="filterName" />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                // value={this.state.filterStatus}
                                onChange={this.onChange} name="filterStatus">
                                <option value="-1">All</option>
                                <option value="0">Hide</option>
                                <option value="1">Activate</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {/**taskItems */}
                    {elementTasks}
                </tbody>
            </table>

        );
    }
}
export default TaskList
