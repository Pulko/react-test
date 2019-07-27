import React, { Component } from 'react';

class TitleFilter extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            filterInput: ""
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const searchValue = this.state.filterInput;
        this.props.submitTitleValue && this.props.submitTitleValue(searchValue)
    }

    onInputChange = (e) => {
        const val = e.target.value;
        this.setState({filterInput: val}, () => {
            this.props.onChangeTitleValue && this.props.onChangeTitleValue(val);
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: "flex", marginTop: "20px"}} title="find">
                <input onChange={this.onInputChange}  
                       style={{width: "100%"}}
                       placeholder="filter by titles..."
                />
                <button type="submit">Find</button>
            </form>
        )
    }
}

export default TitleFilter;
