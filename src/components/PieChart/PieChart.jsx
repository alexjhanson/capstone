import React, { Component } from 'react';

class PieChart extends Component {

    chart = null;

    componentDidMount() {
        fetch(this.props.dataURL)
        .then(response => response.json())
        .then(result => {

            if(!this.chart) {
                this.chart = new window.Chart(this.canvasRef.current.getContext('2d'), {
                    type: 'pie',
                    data: {
                        labels: ['canceled', 'not canceled'],
                        datasets: [{
                            label:'Reservations',
                            data:[result[0]['canceled'], result[0]['not_canceled']],
                            backgroundColor: ['rgb(227, 92, 87)', 'rgb(37, 225, 175)']
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: this.props.title,
                                font: {
                                weight: 'bold',
                                size: 25,
                                color: "black"
                                },
                                position: 'bottom'
                            }
                        }
                    }
                })
            }
            
        });

    }

    canvasRef = React.createRef();

    render() {
        return(
            <div className="chart_container">
                <canvas ref={this.canvasRef} height={350} width={350}></canvas>
            </div>
        )
    }
}

export default PieChart;