/**
 * Created by Johnson on 2017-05-25.
 */

import React from 'react';
import * as dp from "drawpoint";

import {drawControlPoints} from "../../draw";
import {point, interactionFactory} from "../../utils";

export class CubicConstruction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            p1 : dp.point(20, 20),
            p2 : dp.point(170, 120),
            cp1: dp.point(50, 50),
            cp2: dp.point(90, 40),
        };

        // state holds only points (easy)
        const points = Object.keys(this.state);
        this.handler = interactionFactory(this, points);

        // subsequent initialization calls in order
        // componentWillMount
        // render (must be pure)
        // componentDidMount
    }

    componentDidMount() {
        // we can only access the DOM here (the canvas)
        const ctx = this.refs.canvas.getContext('2d');
        this.draw(ctx, this.state);
    }

    componentDidUpdate() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);
        this.draw(ctx, this.state);
    }

    draw(ctx, {p1, p2, cp1, cp2}) {
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
    }


    renderCode() {

        return (
            <pre className="demo-code">
                const p1 = {point(this.state.p1)};{'\n'}
                const p2 = {point(this.state.p2)};{'\n'}
                p2.cp1 = {point(this.state.cp1)};{'\n'}
                p2.cp2 = {point(this.state.cp2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        // no DOM operations (e.g. drawing on canvas) should take place here
        return (
            <div className="demo-unit">
                <canvas width="200" height="200" ref="canvas"
                        onMouseDown={this.handler.handleMouseDown}
                        onMouseUp={this.handler.handleMouseUp}
                        onMouseMove={this.handler.handleMouseMove}
                        className="demo-canvas"></canvas>
                {this.renderCode()}
            </div>
        );
    }
}

export class QuadraticConstruction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            p1 : dp.point(20, 20),
            p2 : dp.point(170, 120),
            cp1: dp.point(50, 50),
        };

        // state holds only points (easy)
        const points = Object.keys(this.state);
        this.handler = interactionFactory(this, points);
    }

    componentDidMount() {
        // we can only access the DOM here (the canvas)
        const ctx = this.refs.canvas.getContext('2d');
        this.draw(ctx, this.state);
    }

    componentDidUpdate() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);
        this.draw(ctx, this.state);
    }

    draw(ctx, {p1, p2, cp1, cp2}) {
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
    }


    renderCode() {

        return (
            <pre className="demo-code">
                const p1 = {point(this.state.p1)};{'\n'}
                const p2 = {point(this.state.p2)};{'\n'}
                p2.cp1 = {point(this.state.cp1)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        // no DOM operations (e.g. drawing on canvas) should take place here
        return (
            <div className="demo-unit">
                <canvas width="200" height="200" ref="canvas"
                        onMouseDown={this.handler.handleMouseDown}
                        onMouseUp={this.handler.handleMouseUp}
                        onMouseMove={this.handler.handleMouseMove}
                        className="demo-canvas"></canvas>
                {this.renderCode()}
            </div>
        );
    }
}
