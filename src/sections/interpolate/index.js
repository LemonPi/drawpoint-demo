/**
 * Created x Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {renderPoint, grey, renderControlPoints} from "../../render";
import {point, InteractiveCanvas} from "../../utils";

export class InterpolateX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(85, 46),
                p2 : dp.point(68, 170),
                cp1: dp.point(48, 112),
                cp2: dp.point(174, 154),
            },
            x     : this.props.x,
        };
        this.slider = <Slider min={0} max={200} step={1} defaultValue={this.state.x}
                              onChange={this.handleSliderChange}/>;
    }

    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (x) => {
        this.setState({
            x
        });

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
        renderControlPoints(ctx, p1, pp2);

        // draw the interpolation line
        const top = dp.point(this.state.x, 0);
        const bot = dp.point(this.state.x, 200);

        ctx.save();
        ctx.strokeStyle = grey;
        ctx.beginPath();
        dp.drawPoints(ctx, top, bot);
        ctx.stroke();
        ctx.restore();

        // find points intersecting this line
        const toFind = dp.point(this.state.x, null);
        const pts = dp.interpolateCurve(p1, pp2, toFind);
        pts.forEach((pt) => {
            renderPoint(ctx, pt, {
                pointStyle: grey,
            });
        });
    };


    renderCode(points, x) {
        const {p1, p2, cp1, cp2} = points;
        const query = dp.point(x, null);
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                const query = {point(query)};{'\n'}
                const pts = dp.interpolateCurve(p1, p2, query);{'\n'}
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
                    {this.renderCode(this.state.points, this.state.x)}
                </div>
                {this.slider}
            </div>
        );
    }
}


export class InterpolateY extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(61, 152),
                p2 : dp.point(132, 136),
                cp1: dp.point(28, 48),
                cp2: dp.point(174, 56),
            },
            y     : this.props.y,
        };
        this.slider = <Slider min={0} max={200} step={1} defaultValue={this.state.y}
                              onChange={this.handleSliderChange}/>;
    }

    getPoints = () => {
        return this.state.points;
    };

    handlePointMove = (e) => {
        const points = this.state.points;
        this.setState(Object.assign(points, {[e.movedPointKey]: e.movedPoint}));
    };

    handleSliderChange = (y) => {
        this.setState({
            y
        });

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
        renderControlPoints(ctx, p1, pp2);

        // draw the interpolation line
        const left = dp.point(0, this.state.y);
        const right = dp.point(200, this.state.y);

        ctx.save();
        ctx.strokeStyle = grey;
        ctx.beginPath();
        dp.drawPoints(ctx, left, right);
        ctx.stroke();
        ctx.restore();

        // find points intersecting this line
        const toFind = dp.point(null, this.state.y);
        const pts = dp.interpolateCurve(p1, pp2, toFind);
        pts.forEach((pt) => {
            renderPoint(ctx, pt, {
                pointStyle: grey,
            });
        });
    };


    renderCode(points, y) {
        const {p1, p2, cp1, cp2} = points;
        const query = dp.point(null, y);
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                const query = {point(query)};{'\n'}
                const pts = dp.interpolateCurve(p1, p2, query);{'\n'}
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
                    {this.renderCode(this.state.points, this.state.y)}
                </div>
                {this.slider}
            </div>
        );
    }
}
