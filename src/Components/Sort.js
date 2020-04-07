import React, { Component } from 'react';



class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'name',
            value: 1
        }
    }
    onClick = (sortBy, value) => {
        this.props.onSort(sortBy, value);
        this.setState({
            sortBy: sortBy,
            value: value
        })
    }
    render() {
        let { sortBy, value } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sort <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a href="#" role="button">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    &nbsp; A&rarr;Z &nbsp;
                                    {(sortBy === 'name' && value === 1) ? <i className="fas fa-check"></i> : ''}
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a href="#" role="button">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    &nbsp;   Z&rarr;A &nbsp;
                                    {(sortBy === 'name' && value === -1) ? <i className="fas fa-check"></i> : ''}
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}><a href="#" role="button">Activated status &nbsp;
                        {(sortBy === 'status' && value === 1) ? <i className="fas fa-check"></i> : ''}</a></li>
                        <li onClick={() => this.onClick('status', -1)}><a href="#" role="button">Hide status &nbsp;
                        {(sortBy === 'status' && value === -1) ? <i className="fas fa-check"></i> : ''}</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Sort;