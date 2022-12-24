import React, { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


class PieChart extends Component {

    constructor() {
        super()

        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                  
                }]
            }
        }
    }

    componentDidMount() {
        fetch(this.props.dataURL)
        .then(response => response.json())
        .then(result => {

            let chartData =  {
                labels: ['canceled', 'not canceled'],
                datasets: [{
                    label:'Reservations',
                    data:[result[0]['canceled'], result[0]['not_canceled']],
                    backgroundColor: ['rgb(227, 92, 87)', 'rgb(37, 225, 175)']
                }]
            }

            this.setState({chartData});
        });

    }

    render() {
        return(
            <div className="chart_container">
                <Pie
                    data={this.state.chartData}
                    options={{
                        plugins: {
                            title: {
                              display: true,
                              text: this.props.title,
                              font: {
                                weight: 'bold',
                                size: 20
                                },
                              position: 'bottom'
                            },
                        }      
                    }}
                    height={325}
                    width={325}
                />
            </div>
        )
    }
}

export default PieChart;