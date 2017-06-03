/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {grey, renderControlPoints} from "../../render";
import {point, InteractiveCanvas} from "../../utils";

export class TransformCurveCubicQuadratic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(95, 35),
                p2 : dp.point(150, 175),
                cp1: dp.point(160, 70),
                cp2: dp.point(170, 115),
                p3 : dp.point(20, 105),
                cp3: dp.point(70, 80),
            },
            by    : this.props.by,
        };
        this.slider = <Slider min={0} max={1} step={0.01} defaultValue={this.state.by}
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
        this.setState({
            by
        });

        // force redraw of canvas
        this.refs.canvas.draw();
    };

    handleCanvasUpdate = (ctx) => {
        const {p1, p2, cp1, cp2, p3, cp3} = this.state.points;
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        const pp3 = dp.clone(p3);
        pp3.cp1 = cp3;

        const p4 = dp.transformCurve(this.state.by, p1, pp2, pp3);

        // the before and after
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grey;
        dp.drawPoints(ctx, p1, pp2);
        dp.drawPoints(ctx, p1, pp3);
        ctx.stroke();
        ctx.restore();

        // the transformed curve
        ctx.beginPath();
        dp.drawPoints(ctx, p1, p4);
        ctx.stroke();

        // draw the overall control points
        renderControlPoints(ctx, p1, pp2);
        renderControlPoints(ctx, p1, pp3);
        renderControlPoints(ctx, p1, p4, {pointStyle: grey});
    };


    renderCode(points, by) {
        const {p1, p2, cp1, cp2, p3, cp3} = points;
        return (
            <pre className="demo-code">
                const p1     = {point(p1)};{'\n'}
                const p2Init = {point(p2)};{'\n'}
                p2Init.cp1   = {point(cp1)};{'\n'}
                p2Init.cp2   = {point(cp2)};{'\n'}
                const p2End  = {point(p3)};{'\n'}
                p2End.cp1    = {point(cp3)};{'\n'}
                const by = {by};{'\n'}
                const p2 = dp.transformCurve(by, p1,{'\n'}
                {'\t'}p2Init, p2End);{'\n'}
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


export class TransformCurveCubicLinear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(75, 25),
                p2 : dp.point(90, 190),
                cp1: dp.point(145, 80),
                cp2: dp.point(30, 100),
                p3 : dp.point(175, 40),
            },
            by    : this.props.by,
        };
        this.slider = <Slider min={0} max={1} step={0.01} defaultValue={this.state.by}
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
        this.setState({
            by
        });

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

        const p4 = dp.transformCurve(this.state.by, p1, pp2, pp3);

        // the before and after
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grey;
        dp.drawPoints(ctx, p1, pp2);
        dp.drawPoints(ctx, p1, pp3);
        ctx.stroke();
        ctx.restore();

        // the transformed curve
        ctx.beginPath();
        dp.drawPoints(ctx, p1, p4);
        ctx.stroke();

        // draw the overall control points
        renderControlPoints(ctx, p1, pp2);
        renderControlPoints(ctx, p1, pp3);
        renderControlPoints(ctx, p1, p4, {pointStyle: grey});
    };


    renderCode(points, by) {
        const {p1, p2, cp1, cp2, p3} = points;
        return (
            <pre className="demo-code">
                const p1     = {point(p1)};{'\n'}
                const p2Init = {point(p2)};{'\n'}
                p2Init.cp1   = {point(cp1)};{'\n'}
                p2Init.cp2   = {point(cp2)};{'\n'}
                const p2End  = {point(p3)};{'\n'}
                const by = {by};{'\n'}
                const p2 = dp.transformCurve(by, p1,{'\n'}
                {'\t'}p2Init, p2End);{'\n'}
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
