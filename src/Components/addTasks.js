import React, { Component } from 'react';

class AddTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: false,
            id: ''
        }
    }
    componentDidMount() {
        if (this.props.edit) {
            this.setState({
                name: this.props.edit.name,
                status: this.props.edit.status,
                id: this.props.edit.id
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.edit) {
            this.setState({
                name: nextProps.edit.name,
                status: nextProps.edit.status,
                id: nextProps.edit.id
            })
        }
        else {
            this.setState({
                name: '',
                status: false,
                id: ''
            })
        }
    }
    closeForm = () => {
        this.props.closeForm();
    }
    getInput = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        this.props.onSubmit(this.state);
        this.setState({
            name: '',
            status: false,
            id: ''
        });
    }
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {this.state.id ? 'Edit your task' : 'Add you task'}
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.getInput}
                            />
                        </div>
                        <label>Status :</label>
                        <select className="form-control" required="required"
                            value={this.state.status}
                            onChange={this.getInput}
                            name="status"
                        >
                            <option value={true}>Activate</option>
                            <option value={false}>Hide</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"  >Add</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.closeForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddTasks;

