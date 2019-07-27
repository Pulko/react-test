import React, { Component } from 'react';

class IdentFilter extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            filterInputs: [],
            singleInput: ""
        }
    }

    addId = (e) => {
        e.preventDefault();
        const {singleInput, filterInputs} = this.state;
        if (singleInput) {
            this.setState({filterInputs: [...filterInputs, singleInput], singleInput: ""});
        }
    }

    onStartSearching = () => {
        if (this.gotAnyIDs()) {
            this.props.submitIdentValue && this.props.submitIdentValue(this.state.filterInputs)
        }
    }

    onEndSearching = () => {
        this.setState({singleInput: "", filterInputs: []});
        this.props.onEndSearching && this.props.onEndSearching();
    }

    onInputChange = (e) => {
        const singleInput = e.target.value;

        if (parseInt(singleInput)) {
            this.setState({singleInput});
        } else {
            this.setState({singleInput: ""});
        }
    }

    gotAnyIDs() {
        return this.state.filterInputs.length;
    }

    render() {
        const { filterInputs, singleInput } = this.state;
        const btnText = this.gotAnyIDs() ? "Add another ID" : "Add ID";
        const ids = <span>{filterInputs.join(", ")}</span>
        return (
            <div>
                <form onSubmit={this.addId} style={{display: "flex", marginTop: "20px"}} title="find">
                    <input style={{width: "100%"}}
                           onChange={this.onInputChange}
                           value={singleInput ? singleInput : ""}
                           placeholder="filter by IDs..."
                    />
                    <input type="submit" value={btnText} />
                </form>
                {
                    this.gotAnyIDs() 
                    ? <input type="button" 
                             style={{width: "100%"}}
                             value={"Search these IDs"} 
                             onClick={this.onStartSearching}>

                      </input> 
                    : null
                }
                {
                    this.gotAnyIDs() 
                    ? <input type="button" 
                             style={{width: "100%"}}
                             value={"Cancel filtering by IDs"} 
                             onClick={this.onEndSearching}>

                      </input> 
                    : null
                }
                <div>
                {
                    this.gotAnyIDs() 
                    ? <div><b>Currently added IDs:</b> {ids}</div> 
                    : null
                }
                </div>
            </div>
        )
    }
}

export default IdentFilter;
