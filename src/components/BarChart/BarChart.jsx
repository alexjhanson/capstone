import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


class BarChart extends Component {

    constructor() {
        super()

        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label:'',
                    data: [],
                    backgroundColor: ''
                }]
            }
        }
    }

    componentDidMount() {
        fetch(this.props.dataURL)
        .then(response => response.json())
        .then(result => {

            let months = result[0].months;
            let labels = Object.keys(months);

            let values = [];
            for(let i in labels) {
               values.push(months[labels[i]]);
            }

            let chartData = {
                labels,
                datasets: [{
                    label:'',
                    data: values,
                    backgroundColor: 'rgb(132,209,249)'
                }]
            }

            this.setState({chartData});
        });
    }

    render() {
        return(
            <div className="chart_container">
                <Bar
                    data={this.state.chartData}
                    options={{
                        plugins: {
                            title: {
                              display: true,
                              text: this.props.title,
                              font: {
                                weight: 'bold',
                                size: 20
                            }
                            },
                           legend: { 
                              display: false
                            }
                        }      
                    }}
                    height={400}
                    width={500}
                />
            </div>
        )
    }
}

export default BarChart;