/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

import {drawControlPoints} from "../../draw";
import {point, createBasicDemo} from "../../utils";


export const CubicConstruction = createBasicDemo("CubicConstruction", {
    state : {
        p1 : dp.point(20, 20),
        p2 : dp.point(170, 120),
        cp1: dp.point(50, 50),
        cp2: dp.point(90, 40),
    },
    points: ["p1", "p2", "cp1", "cp2"],
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
    },
    renderCode({p1, p2, cp1, cp2}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                p2.cp2   = {point(cp2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }
});

export const QuadraticConstruction = createBasicDemo("QuadraticConstruction", {
    state : {
        p1 : dp.point(20, 20),
        p2 : dp.point(173, 94),
        cp1: dp.point(50, 140),
    },
    points: ["p1", "p2", "cp1"],
    draw(ctx, {p1, p2, cp1}) {
        // attach the control points
        const pp2 = dp.clone(p2);
        pp2.cp1 = cp1;

        ctx.beginPath();
        dp.drawPoints(ctx, p1, pp2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, pp2);
    },
    renderCode({p1, p2, cp1}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                p2.cp1   = {point(cp1)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        );
    }
});

export const LinearConstruction = createBasicDemo("LinearConstruction", {
    state : {
        p1: dp.point(20, 20),
        p2: dp.point(170, 120),
    },
    points: ["p1", "p2"],
    draw(ctx, {p1, p2}) {
        ctx.beginPath();
        dp.drawPoints(ctx, p1, p2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, p2);
    },
    renderCode({p1, p2}) {
        return (
            <pre className="demo-code">
                const p1 = {point(p1)};{'\n'}
                const p2 = {point(p2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        );
    }
});
