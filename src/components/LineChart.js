import React from 'react';
import {Bar, Line} from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

export default class LineChart extends React.Component {
    render() {
        return (
            <div className="tile is-ancestor" style={{backgroundColor: "#FFF"}}>
                <div className="m-6">
                    <h2 className="is-centered">Bar Example (custom size)</h2>
                </div>

                <div className="tile is-6 is-centered m-4">
                    <Line
                        data={state}
                        options={{
                            title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
