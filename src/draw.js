/**
 * Created by Johnson on 2017-05-25.
 */
import * as dp from "drawpoint";
import chroma from "chroma-js";

export function drawPoint(ctx, p, offset) {
    offset = offset || {
            x: 0,
            y: 0
        };
    const ox = offset.x;
    const oy = offset.y;

    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, 3, 0, 2 * Math.PI);
    ctx.stroke();
}

const palette = chroma.scale(['#fafa6e', '#2A4858']).mode('lch')

export function getColour(scale) {
    if (typeof scale === "undefined") {
        scale = Math.random();
    }
    return palette(scale);
}

export function getControlPointLineStyle(ctx) {
    return chroma.mix("white", ctx.strokeStyle, 0.3);
}

export function drawControlPoints(ctx, p1, p2) {
    // draw control points
    drawPoint(ctx, p1);
    drawPoint(ctx, p2);
    dp.applyToCurve(p1, p2, {
        linear() {
        },
        quadratic(p1, cp, p2) {
            drawPoint(ctx, cp);
            ctx.save();
            ctx.strokeStyle = getControlPointLineStyle(ctx);
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp, p2);
            ctx.stroke();
            ctx.restore();
        },
        cubic(p1, cp1, cp2, p2) {
            drawPoint(ctx, cp1);
            drawPoint(ctx, cp2);
            ctx.save();
            ctx.strokeStyle = getControlPointLineStyle(ctx);
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp1, dp.breakPoint, p2, cp2);
            ctx.stroke();
            ctx.restore();
        }
    });
}