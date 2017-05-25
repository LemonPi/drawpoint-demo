/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {CubicConstruction} from "./sections/construction";


class Section extends React.Component {
    render() {
        return (
            <div className="demo-section">
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Section title="Construction">
        <CubicConstruction/>
    </Section>,
    document.getElementById('root')
);