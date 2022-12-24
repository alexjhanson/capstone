import React, { Component } from 'react';
import RecordColumn from '../RecordColumn/RecordColumn';
import './RecordRow.css';


class RecordRow extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            selIndx: null,
            buttonDisabled: true,
            checkboxesDisabled: false,
            result: {}
        };
    }

    handleSelIndx = (index) => {
            this.setState({selIndx: index, buttonDisabled: index != null ? false: true});
    }

    processPrediction = () => {
        fetch(`/api/ml_model/make_prediction/${this.state.data[this.state.selIndx-1].res_id}`)
        .then(response => response.json())
        .then(result => this.setState({result: result[0], buttonDisabled: false, checkboxesDisabled: false}))
        this.setState({
            buttonDisabled: true,
            checkboxesDisabled: true
        });
    }

    getData() {
        fetch(this.props.dataURL)
        .then(response => response.json())
        .then(data => this.setState({data: data}));
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        return (
            <div className="record_row">
                <h1>{this.props.dataHeader}</h1>
                <RecordColumn
                    data={this.state.data}
                    result={this.state.result}
                    selIndx={this.state.selIndx}
                    checkboxesDisabled={this.state.checkboxesDisabled}
                    handleSelIndx={this.handleSelIndx}
                    processed={this.props.processed}
                />
                <button 
                    className="record_row-btn"
                    onClick={this.processPrediction}
                    disabled={this.state.buttonDisabled}
                    style={this.state.buttonDisabled ? null : { 
                        backgroundColor: "rgb(78,179,214)",
                        border: 'none',
                        boxShadow: "5px 10px 5px #888888"
                    }}
                >
                    Make Prediction
                </button>
            </div>
        );

    }
}

export default RecordRow;
