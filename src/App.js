import React, { Component } from 'react';
import AddTasks from './Components/addTasks';
import SearchSort from './Components/SearchSort';
import TaskList from './Components/TaskList';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEdit: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }
    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    };

    toggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEdit) {
            this.setState({
                isDisplayForm: true,
                taskEdit: null
            })
        }
        else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEdit: null

            });
        }
    }
    GenerateID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substring(2, 9);
    };
    closeForm = () => {
        this.setState({
            isDisplayForm: false,
            taskEdit: null
        })
    }
    findIndex = (id) => {
        let result = -1
        this.state.tasks.forEach((task, index) => {
            if (id === task.id) result = index;
        });
        return result;
    }
    onSubmit = (data) => {
        let tasks = this.state.tasks;

        if (data.id) {
            let id = this.findIndex(data.id);
            // console.log(id);
            tasks.splice(id, 1, data);
        }
        else {
            data.id = this.GenerateID();
            tasks.push(data);
        }
        this.setState({
            tasks: tasks,
            isDisplayForm: false,
            taskEdit: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    toggleStatus = (task) => {
        // console.log(task);
        let tasks = this.state.tasks;
        tasks[tasks.indexOf(task)].status = !tasks[tasks.indexOf(task)].status;
        // console.log(tasks[tasks.indexOf(task)]);
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    deleteTask = (task) => {
        // console.log(task);
        let { tasks } = this.state;
        tasks.splice(tasks.indexOf(task), 1);
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.closeForm();

    }
    onEdit = (task) => {
        // console.log(task);
        this.setState({
            isDisplayForm: true,
            taskEdit: task
        })
    }
    onFilter = (name, status) => {
        status = parseInt(status);
        // console.log(name + '-' + status);
        this.setState({
            filter: {
                name: name.toLowerCase(),
                status: status
            }
        })
    }
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }
    onSort = (sortBy, value) => {
        // console.log(sortBy, '-', value);
        this.setState({
            sortBy:sortBy,
            sortValue:value
        })
        // console.log(this.state);    
    }
    render() {
        let { tasks, isDisplayForm, filter, keyword,sortBy,sortValue } = this.state; //tasks = this.state.tasks
        // console.log(sortBy,'-', sortValue);
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    if (task.name.toLowerCase().indexOf(filter.name) !== -1)
                        return true;
                });
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) return true;
                else return task.status === (filter.status === 1 ? true : false);
            });
        }
        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            });
        }
        if (sortBy === 'name') {
            tasks.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return sortValue;
                else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sortValue;
                else return 0;
            });
        }
        if (sortBy === 'status') {
            tasks.sort((a,b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            });
        }
        let show = isDisplayForm ?
            <AddTasks
                edit={this.state.taskEdit}
                onSubmit={this.onSubmit}
                closeForm={this.closeForm} /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Tasks Management</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={show ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                        {/*Add task tag */}
                        {show};
                    </div>
                    <div className={show ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick={this.toggleForm}>
                            <span className="fa fa-plus mr-5"></span> Add you tasks
                        </button>&nbsp;

                        {/*Search and Sort function */}
                        <SearchSort onSearch={this.onSearch} onSort={this.onSort}/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                {/*Table */}
                                <TaskList
                                    onFilter={this.onFilter}
                                    onEdit={this.onEdit}
                                    deleteTask={this.deleteTask}
                                    toggleStatus={this.toggleStatus}
                                    tasks={tasks} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
