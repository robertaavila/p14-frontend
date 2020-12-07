import React from "react";
import 'bulma-graphs/graphs'

export default class Graphs extends React.Component {
    render() {

        // let graphs = { // initialize object with settings
        //     settings: {
        //         animation: true,            // true | false
        //         autoGenerate: true,         // true | false
        //         containerItemSelector: '.graphs-container .data-container div',
        //         containerSelector: '.graphs-container',
        //         errorMessages: true,        // true | false
        //         heightMultiplicator: 3,     // scales in pixel
        //         widthMultiplicator: 1,      // scales in % (percentage)
        //     },
        // };

        return (
            <div className="graphs-container" data-title="">
                <div className="data-container is-vertical-graph is-multiline">
                    <div data-title="" data-value="10">um</div>
                    <div data-title="" data-value="50">dois</div>
                    <div data-title="" data-value="100">tres</div>
                </div>
            </div>
        );
    }
}


