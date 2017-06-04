/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {renderPoint, grey, renderControlPoints} from "../../render";
import {point, InteractiveCanvas} from "../../utils";

export class ScalePoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points     : {
                p1 : dp.point(56, 54),
                p2 : dp.point(118, 112),
                cp1: dp.point(42, 162),
                cp2: dp.point(80, 150),
            },
            referencePt: dp.point(80, 100),
            by         : this.props.by,
        };
        this.slider = <Slider min={0.01} max={3} step={0.01} defaultValue={this.state.by}
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
        // scale by the relative change
        const relativeScale = by / this.state.by;

        const pointNames = Object.keys(this.state.points);
        const pointsArr = pointNames.map(name => dp.clone(this.state.points[name]));

        dp.scalePoints(this.state.referencePt,
            relativeScale,
            ...pointsArr);

        const points = {};
        pointNames.forEach((name, index) => {
            points[name] = pointsArr[index];
        });

        this.setState({
            points,
            by
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

        renderPoint(ctx, this.state.referencePt, {
            pointStyle: grey,
        });
    };


    renderCode(points, by) {
        // show the untransformed coordinates
        const pointCopies = dp.clone(points);
        dp.scalePoints(this.state.referencePt,
            1 / by,
            ...Object.keys(pointCopies).map(key => pointCopies[key]));
        const {p1, p2, cp1, cp2} = pointCopies;

        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                by       = {by};{'\n'}
                const p0 = {point(this.state.referencePt)};{'\n'}
                // returns nothing since it does it in place{'\n'}
                dp.scalePoints(p0, by, p1, p2);{'\n'}
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
