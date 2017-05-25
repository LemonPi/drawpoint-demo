/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

import {drawControlPoints} from "../../draw";
import {point, createBasicDemo} from "../../utils";

export const CurveClosing = createBasicDemo("CurveClosing", {
    state : {
        p1 : dp.point(20, 20),
        p2 : dp.point(34, 160),
        cp1: dp.point(50, 50),
        cp2: dp.point(13, 140),
        p3 : dp.point(160, 135),
        cp3: dp.point(60, 180),
        cp4: dp.point(170, 20),
    },
    points: ["p1", "p2", "cp1", "cp2", "p3", "cp3", "cp4"],
    draw(ctx, {p1, p2, cp1, cp2, p3, cp3, cp4}) {
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        const pp3 = dp.clone(p3);
        pp3.cp1 = cp3;

        const pp1 = dp.clone(p1);
        pp1.cp1 = cp4;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2, pp3, pp1);

        ctx.fillStyle = "#eee";
        ctx.fill();
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
        drawControlPoints(ctx, pp2, pp3);
        drawControlPoints(ctx, pp3, pp1);
    },
    renderCode({p1, p2, cp1, cp2, p3, cp3, cp4}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                const p3 = {point(p3)};{'\n'}
                p3.cp1   = {point(cp3)};{'\n'}
                // p1 is now also an end point{'\n'}
                p1.cp1   = {point(cp4)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2, p3, p1);{'\n'}
                ctx.fill();{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }
});

