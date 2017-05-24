/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as dp from "drawpoint";
import './index.css';


function fixMouseEvent(e) {
    e = e || window.event;
    const target = e.target || e.srcElement,
        rect = target.getBoundingClientRect();
    e.offsetX = e.clientX - rect.left;
    e.offsetY = e.clientY - rect.top;
}

// ========================================

function point(p) {
    return `dp.point(${p.x}, ${p.y})`;
}

function drawPoint(ctx, p, offset) {
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
const controlPointLineStyle = "#999";
function drawControlPoints(ctx, p1, p2) {
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


class DemoUnit extends React.Component {
    constructor(props) {
        super(props);

        const p1 = dp.point(20, 20);
        const p2 = dp.point(170, 120);
        p2.cp1 = dp.point(50, 50);
        p2.cp2 = dp.point(90, 40);

        this.state = {
            p1,
            p2
        };

        // subsequent initialization calls in order
        // componentWillMount
        // render (must be pure)
        // componentDidMount
    }

    componentDidMount() {
        // we can only access the DOM here (the canvas)
        const ctx = this.refs.canvas.getContext('2d');
        this.draw(ctx, this.state);
    }

    componentDidUpdate() {
        const ctx = this.refs.canvas.getContext('2d');
        // ctx.clearRect(0, 0, 200, 200);
        // this.draw(ctx);
    }

    draw(ctx, {p1, p2}) {
        ctx.beginPath();
        dp.drawPoints(ctx, p1, p2);
        ctx.stroke();

        // draw the control points
        drawControlPoints(ctx, p1, p2);
    }


    renderCode() {

        return (
            <pre className="demo-code">
                const p1 = {point(this.state.p1)};{'\n'}
                const p2 = {point(this.state.p2)};{'\n'}
                p2.cp1 = {point(this.state.p2.cp1)};{'\n'}
                p2.cp2 = {point(this.state.p2.cp2)};{'\n'}
                {'\n'}
                ctx.beginPath();{'\n'}
                dp.drawPoints(ctx, p1, p2);{'\n'}
                ctx.stroke();{'\n'}
            </pre>
        )
    }

    render() {
        // no DOM operations (e.g. drawing on canvas) should take place here
        return (
            <div className="demo-unit">
                <canvas width="200" height="200" ref="canvas"
                        className="demo-canvas"></canvas>
                {this.renderCode()}
            </div>
        );
    }
}


ReactDOM.render(
    <DemoUnit/>,
    document.getElementById('root')
);