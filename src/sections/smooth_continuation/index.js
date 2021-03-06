/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {renderPoint, grey, renderControlPoints} from "../../render";
import {point, InteractiveCanvas} from "../../utils";

export class SmoothContinuationCubicQuadratic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(100, 100),
                cp1: dp.point(42, 162),
                cp2: dp.point(80, 150),
                p3 : dp.point(165, 165),
            },
            by    : this.props.by,
        };
        this.slider = <Slider min={0} max={3} step={0.01} defaultValue={this.state.by}
                              onChange={this.handleSliderChange}/>;
    }


    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (by) => {
        this.setState({by});
        // force redraw of canvas
        this.refs.canvas.draw();
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1, cp2, p3} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        const pp3 = dp.clone(p3);
        pp3.cp1 = dp.continueCurve(p1, pp2, this.state.by);

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2, pp3);
        ctx.stroke();

        // draw the overall control points
        renderControlPoints(ctx, p1, pp2);

        // draw control points for the curves left and right sides after splitting
        renderControlPoints(ctx,
            pp2,
            pp3,
            {
                pointStyle: grey,
            });

        renderPoint(ctx, pp2);
        renderPoint(ctx, pp3);
    };


    renderCode({p1, p2, cp1, cp2, p3}, by) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                const p3 = {point(p3)};{'\n'}
                by       = {by};{'\n'}
                p3.cp1   = dp.continueCurve(p1, p2, by);{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2, p3);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        return (
            <div>
                <div className="demo-unit">
                    <InteractiveCanvas ref="canvas" getPoints={this.getPoints}
                                       handleCanvasUpdate={this.handleCanvasUpdate}
                                       handlePointMove={this.handlePointMove}/>
                    {this.renderCode(this.state.points, this.state.by)}
                </div>
                {this.slider}
            </div>
        );
    }
}

export class SmoothContinuationQuadraticCubic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(100, 100),
                cp1: dp.point(42, 162),
                p3 : dp.point(165, 165),
                cp2: dp.point(80, 150),
            },
            by    : this.props.by,
        };
        this.slider = <Slider min={0} max={3} step={0.01} defaultValue={this.state.by}
                              onChange={this.handleSliderChange}/>;
    }


    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (by) => {
        this.setState({by});
        // force redraw of canvas
        this.refs.canvas.draw();
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1, cp2, p3} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;

        const pp3 = dp.clone(p3);
        pp3.cp1 = dp.continueCurve(p1, pp2, this.state.by);
        pp3.cp2 = cp2;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2, pp3);
        ctx.stroke();

        // draw the overall control points
        renderControlPoints(ctx, p1, pp2);

        // draw control points for the curves left and right sides after splitting
        renderControlPoints(ctx,
            pp2,
            pp3,
            {
                pointStyle: grey,
            });

        renderPoint(ctx, pp2);
        renderPoint(ctx, pp3);
        renderPoint(ctx, cp2);
    };


    renderCode({p1, p2, cp1, cp2, p3}, by) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                const p3 = {point(p3)};{'\n'}
                by       = {by};{'\n'}
                p3.cp1   = dp.continueCurve(p1, p2, by);{'\n'}
                p3.cp2   = {point(cp2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2, p3);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        return (
            <div>
                <div className="demo-unit">
                    <InteractiveCanvas ref="canvas" getPoints={this.getPoints}
                                       handleCanvasUpdate={this.handleCanvasUpdate}
                                       handlePointMove={this.handlePointMove}/>
                    {this.renderCode(this.state.points, this.state.by)}
                </div>
                {this.slider}
            </div>
        );
    }
}
export class SmoothContinuationLinearCubic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(100, 40),
                p3 : dp.point(165, 165),
                cp1: dp.point(80, 150),
            },
            by    : this.props.by,
        };
        this.slider = <Slider min={0} max={3} step={0.01} defaultValue={this.state.by}
                              onChange={this.handleSliderChange}/>;
    }


    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (by) => {
        this.setState({by});
        // force redraw of canvas
        this.refs.canvas.draw();
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1, p3} = this.state.points;

        const pp3 = dp.clone(p3);
        pp3.cp1 = dp.continueCurve(p1, p2, this.state.by);
        pp3.cp2 = cp1;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, p2, pp3);
        ctx.stroke();

        // draw the overall control points
        renderControlPoints(ctx, p1, p2);

        // draw control points for the curves left and right sides after splitting
        renderControlPoints(ctx,
            p2,
            pp3,
            {
                pointStyle: grey,
            });

        renderPoint(ctx, p2);
        renderPoint(ctx, pp3);
        renderPoint(ctx, cp1);
    };


    renderCode({p1, p2, p3, cp1}, by) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                const p3 = {point(p3)};{'\n'}
                by       = {by};{'\n'}
                p3.cp1   = dp.continueCurve(p1, p2, by);{'\n'}
                p3.cp2   = {point(cp1)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2, p3);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        return (
            <div>
                <div className="demo-unit">
                    <InteractiveCanvas ref="canvas" getPoints={this.getPoints}
                                       handleCanvasUpdate={this.handleCanvasUpdate}
                                       handlePointMove={this.handlePointMove}/>
                    {this.renderCode(this.state.points, this.state.by)}
                </div>
                {this.slider}
            </div>
        );
    }
}