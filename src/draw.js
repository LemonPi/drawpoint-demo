/**
 * Created by Johnson on 2017-05-25.
 */
import * as dp from "drawpoint";

// palette
export const red = "#ED3B3B";
export const blue = "#08B2E3";

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

export function drawControlPoints(ctx, p1, p2, options) {
    // various drawing options
    options = Object.assign({
        radius    : 3,
        pointStyle: "black",
        lineStyle : controlPointLineStyle
    }, options);

    ctx.save();
    // draw control points
    ctx.strokeStyle = options.pointStyle;
    drawPoint(ctx, p1, 0, options.radius);
    drawPoint(ctx, p2, 0, options.radius);
    dp.applyToCurve(p1, p2, {
        linear() {
        },
        quadratic(p1, cp, p2) {
            drawPoint(ctx, cp, 0, options.radius);
            ctx.strokeStyle = options.lineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp, p2);
            ctx.stroke();
        },
        cubic(p1, cp1, cp2, p2) {
            drawPoint(ctx, cp1, 0, options.radius);
            drawPoint(ctx, cp2, 0, options.radius);
            ctx.strokeStyle = options.lineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp1, dp.breakPoint, p2, cp2);
            ctx.stroke();
        }
    });
    ctx.restore();
}