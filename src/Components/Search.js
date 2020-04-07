import React, { Component } from 'react';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state ={
            keyword: ''
        };
    };
    onSearch = (event) => {
        let target= event.target;
        let value = target.value;
        let name = target.name;
        this.setState({ 
            [name] : value
        });
    }
    onClick = () => {
        this.props.onSearch(this.state.keyword);
    }
    render() {
    
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input 
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.onSearch}
                    type="text" 
                    className="form-control" 
                    placeholder="Enter keyword..." />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onClick}>
                            <span  className="fa fa-search mr-5"></span>Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
export default Search;