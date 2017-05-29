/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

import {drawControlPoints} from "../../draw";
import {point, InteractiveCanvas} from "../../utils";


export class CubicConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(170, 120),
                cp1: dp.point(50, 50),
                cp2: dp.point(90, 40),
            },
        };
        this.canvas = <InteractiveCanvas getPoints={this.getPoints}
                                         handleCanvasUpdate={this.handleCanvasUpdate}
                                         handlePointMove={this.handlePointMove}/>;
    }

    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1, cp2} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
    };

    renderCode({p1, p2, cp1, cp2}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    };

    render() {
        return (
            <div>
                <div className="demo-unit">
                    {this.canvas}
                    {this.renderCode(this.state.points)}
                </div>
            </div>
        );
    }
}


export class QuadraticConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(173, 94),
                cp1: dp.point(50, 140),
            },
        };
        this.canvas = <InteractiveCanvas getPoints={this.getPoints}
                                         handleCanvasUpdate={this.handleCanvasUpdate}
                                         handlePointMove={this.handlePointMove}/>;
    }

    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
    };

    renderCode({p1, p2, cp1}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        return (
            <div>
                <div className="demo-unit">
                    {this.canvas}
                    {this.renderCode(this.state.points)}
                </div>
            </div>
        );
    }
}

export class LinearConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1: dp.point(20, 20),
                p2: dp.point(170, 120),
            },
        };
        this.canvas = <InteractiveCanvas getPoints={this.getPoints}
                                         handleCanvasUpdate={this.handleCanvasUpdate}
                                         handlePointMove={this.handlePointMove}/>;
    }

    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2} = this.state.points;
        ctx.beginPath();
        dp.drawPoints(ctx, p1, p2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, p2);
    };

    renderCode({p1, p2}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        );
    }

    render() {
        return (
            <div>
                <div className="demo-unit">
                    {this.canvas}
                    {this.renderCode(this.state.points)}
                </div>
            </div>
        );
    }
}
