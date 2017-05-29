/**
 * Created by Johnson on 2017-05-25.
 */
import * as dp from "drawpoint";

export function drawPoint(ctx, p, offset, radius = 3) {
    offset = offset || {
            x: 0,
            y: 0
        };
    const ox = offset.x;
    const oy = offset.y;

    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

const controlPointLineStyle = "#ccc";

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
            ctx.strokeStyle = controlPointLineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp, p2);
            ctx.stroke();
            ctx.restore();
        },
        cubic(p1, cp1, cp2, p2) {
            drawPoint(ctx, cp1);
            drawPoint(ctx, cp2);
            ctx.save();
            ctx.strokeStyle = controlPointLineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp1, dp.breakPoint, p2, cp2);
            ctx.stroke();
            ctx.restore();
        }
    });
}