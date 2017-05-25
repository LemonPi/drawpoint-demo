/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
export default class Section extends React.Component {
    render() {
        return (
            <div className="demo-section">
                {this.props.children}
            </div>
        )
    }
}