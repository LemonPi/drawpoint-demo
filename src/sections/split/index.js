/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {drawPoint, grey, red, blue, drawControlPoints} from "../../draw";
import {point, InteractiveCanvas} from "../../utils";

export class SplitCurveQuadratic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(170, 120),
                cp1: dp.point(42, 162),
            },
            t     : this.props.t,
        };
        this.slider = <Slider min={0} max={1} step={0.01} defaultValue={this.state.t}
                              onChange={this.handleSliderChange}/>;
    }


    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (t) => {
        this.setState({t});
        // force redraw of canvas
        this.refs.canvas.draw();
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the overall control points
        drawControlPoints(ctx, p1, pp2);

        const sp = dp.splitCurve(this.state.t, p1, pp2);

        // draw control points for the curves left and right sides after splitting
        drawControlPoints(ctx,
            sp.left.p1,
            sp.left.p2,
            {
                pointStyle: red,
                lineStyle : red
            });
        drawControlPoints(ctx,
            sp.right.p1,
            sp.right.p2,
            {
                pointStyle: blue,
                lineStyle : blue
            });

        drawPoint(ctx, sp.left.p2, {pointStyle: grey});
    };


    renderCode({p1, p2, cp1}, t) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                t        = {t};{'\n'}
                const sp = dp.splitCurve(t, p1, p2);{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, sp.left.p1, sp.left.p2);{'\n'}
                dp.drawPoints(ctx, sp.right.p1, sp.right.p2);{'\n'}
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
                    {this.renderCode(this.state.points, this.state.t)}
                </div>
                {this.slider}
            </div>
        );
    }
}


export class SplitCurveCubic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(20, 20),
                p2 : dp.point(170, 120),
                cp1: dp.point(42, 162),
                cp2: dp.point(176, 30),
            },
            t     : this.props.t,
        };
        this.slider = <Slider min={0} max={1} step={0.01} defaultValue={this.state.t}
                              onChange={this.handleSliderChange}/>;
    }


    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (t) => {
        this.setState({t});
        // force redraw of canvas
        this.refs.canvas.draw();
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

        // draw the overall control points
        drawControlPoints(ctx, p1, pp2);

        const sp = dp.splitCurve(this.state.t, p1, pp2);

        // draw control points for the curves left and right sides after splitting
        drawControlPoints(ctx,
            sp.left.p1,
            sp.left.p2,
            {
                pointStyle: red,
                lineStyle : red
            });
        drawControlPoints(ctx,
            sp.right.p1,
            sp.right.p2,
            {
                pointStyle: blue,
                lineStyle : blue
            });

        drawPoint(ctx, sp.left.p2, {pointStyle: grey});
    };


    renderCode({p1, p2, cp1, cp2}, t) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                t        = {t};{'\n'}
                const sp = dp.splitCurve(t, p1, p2);{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, sp.left.p1, sp.left.p2);{'\n'}
                dp.drawPoints(ctx, sp.right.p1, sp.right.p2);{'\n'}
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
                    {this.renderCode(this.state.points, this.state.t)}
                </div>
                {this.slider}
            </div>
        );
    }
}

