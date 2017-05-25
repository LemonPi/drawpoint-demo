/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

import {drawControlPoints} from "../../draw";
import {point, createBasicDemo} from "../../utils";

export const CurveChaining = createBasicDemo("CurveChaining", {
    state : {
        p1 : dp.point(20, 20),
        p2 : dp.point(41, 110),
        cp1: dp.point(50, 50),
        cp2: dp.point(90, 40),
        p3 : dp.point(190, 100),
        cp3: dp.point(65, 175),
    },
    points: ["p1", "p2", "cp1", "cp2", "p3", "cp3"],
    draw(ctx, {p1, p2, cp1, cp2, p3, cp3}) {
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;
        pp2.cp2 = cp2;

        const pp3 = dp.clone(p3);
        pp3.cp1 = cp3;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2, pp3);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
        drawControlPoints(ctx, pp2, pp3);
    },
    renderCode({p1, p2, cp1, cp2, p3, cp3}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                const p3 = {point(p3)};{'\n'}
                p3.cp1   = {point(cp3)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2, p3);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }
});

