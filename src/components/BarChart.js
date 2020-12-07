import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};



export default class BarChart extends React.Component {
    render() {
        return (
            <div className="tile is-ancestor" style={{backgroundColor: "#FFF"}}>
                <div className="m-6">
                    <h2 className="is-centered">Bar Example (custom size)</h2>
                </div>

                <div className="tile is-6 is-centered m-4">
                    <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />
                </div>
            </div>
        );
    }
};


