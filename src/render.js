/**
 * Created by Johnson on 2017-05-25.
 */
import * as dp from "drawpoint";

// palette
export const red = "#ED3B3B";
export const blue = "#08B2E3";
export const grey = "#999";

export function renderPoint(ctx, p, options) {
    options = Object.assign({
        radius    : 3,
        pointStyle: "black",
        offset    : dp.point(0, 0),
    }, options);

    const ox = options.offset.x;
    const oy = options.offset.y;

    ctx.save();
    ctx.strokeStyle = options.pointStyle;
    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, options.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

const controlPointLineStyle = "#ccc";

export function renderControlPoints(ctx, p1, p2, options) {
    // various drawing options
    options = Object.assign({
        radius    : 3,
        pointStyle: "black",
        lineStyle : controlPointLineStyle
    }, options);

    ctx.save();
    // draw control points
    ctx.strokeStyle = options.pointStyle;
    renderPoint(ctx, p1, options);
    renderPoint(ctx, p2, options);
    dp.applyToCurve(p1, p2, {
        linear() {
        },
        quadratic(p1, cp, p2) {
            renderPoint(ctx, cp, options);
            ctx.strokeStyle = options.lineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp, p2);
            ctx.stroke();
        },
        cubic(p1, cp1, cp2, p2) {
            renderPoint(ctx, cp1, options);
            renderPoint(ctx, cp2, options);
            ctx.strokeStyle = options.lineStyle;
            ctx.beginPath();
            dp.drawPoints(ctx, p1, cp1, dp.breakPoint, p2, cp2);
            ctx.stroke();
        }
    });
    ctx.restore();
}