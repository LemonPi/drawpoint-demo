/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {grey, drawPoint, drawControlPoints} from "../../draw";
import {point, InteractiveCanvas} from "../../utils";

export class GetPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(132, 20),
                p2 : dp.point(60, 170),
                cp1: dp.point(36, 68),
                cp2: dp.point(164, 126),
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

        // draw the control points
        drawControlPoints(ctx, p1, pp2);

        const p = dp.getPointOnCurve(this.state.t, p1, pp2);

        drawPoint(ctx,
            p,
            {
                pointStyle: grey,
                radius: 5
            });
    };


    renderCode({p1, p2, cp1, cp2}, t) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                t        = {t};{'\n'}
                const p  = dp.getPointOnCurve(t, p1, p2);{'\n'}
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
                    {this.renderCode(this.state.points, this.state.t)}
                </div>
                {this.slider}
            </div>
        );
    }
}

