/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

import {red, drawControlPoints} from "../../draw";
import {point, InteractiveCanvas} from "../../utils";

export class ElevateQuadratic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: {
                p1 : dp.point(12, 85),
                p2 : dp.point(170, 90),
                cp1: dp.point(85, 162),
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

        // draw the overall control points
        drawControlPoints(ctx, p1, pp2);

        const cubicEndPoint = dp.elevateDegree(p1, pp2);
        drawControlPoints(ctx, p1, cubicEndPoint, {
            pointStyle: red,
            lineStyle : red
        });
    };


    renderCode({p1, p2, cp1}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                const pp2 = dp.elevateDegree(p1, p2);{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, pp2);{'\n'}
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


