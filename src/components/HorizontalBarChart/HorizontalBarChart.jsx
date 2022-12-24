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


class HorizontalBarChart extends Component {

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

            let features = result[0];
            let labels = Object.keys(features);

            let values = [];
            for(let i in labels) {
               values.push(features[labels[i]]);
            }

            let chartData = {
                labels,
                datasets: [{
                    label:'',
                    data: values,
                    backgroundColor: [
                        'rgb(89,205,193)',
                        'rgb(198,248,104)',
                        'rgb(132,209,249)',
                        'rgb(249,105,109)',
                        'rgb(33,139,251)',
                        'rgb(43,230,149)',
                        'rgb(252,175,46)',
                        'rgb(246,152,162)',
                        'rgb(119,92,205)',
                        'rgb(193,158,103)',
                        'rgb(154,176,75)'
                    ]
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
                                size: 20,
                              },
                              position: 'bottom'
                            },
                           legend: { 
                              display: false
                            },
                        },
                        indexAxis: 'y'      
                    }}
                    height={400}
                    width={400}
                />
            </div>
        )
    }
}

export default HorizontalBarChart;