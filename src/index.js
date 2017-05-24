/**
 * Created by Johnson on 2017-05-20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as dp from "drawpoint";
import './index.css';


function getMousePoint(e) {
    e = e || window.event;
    const target = e.target || e.srcElement,
        rect = target.getBoundingClientRect();
    return dp.point(e.clientX - rect.left, e.clientY - rect.top);
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


        this.state = {
            p1 : dp.point(20, 20),
            p2 : dp.point(170, 120),
            cp1: dp.point(50, 50),
            cp2: dp.point(90, 40),
        };

        this.points = Object.keys(this.state);
        console.log(this.points);

        this.mousePoint = null;
        this.movingPoint = null;
        this.moving = false;

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
        ctx.clearRect(0, 0, 200, 200);
        this.draw(ctx, this.state);
    }

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
    }

    // interaction handlers (automatically bound to this)
    handleMouseDown = (e) => {
        this.mousePoint = getMousePoint(e);

        this.points.forEach((p) => {
            if (dp.norm(dp.diff(this.state[p], this.mousePoint)) < 10) {
                this.moving = true;
                this.movingPoint = p;
            }
        });
    };

    handleMouseUp = () => {
        if (this.moving === false) {
            return;
        }

        this.refs.canvas.style.cursor = "default";

        this.moving = false;
        this.movingPoint = null;
    };

    handleMouseMove = (e) => {
        const newMousePoint = getMousePoint(e);

        let movingNearPoint = false;
        this.points.forEach((p) => {
            if (dp.norm(dp.diff(this.state[p], newMousePoint)) < 10) {
                movingNearPoint = true;
            }
        });

        this.refs.canvas.style.cursor = movingNearPoint ? "pointer" : "default";

        if (this.moving === false) {
            return;
        }

        // we want to capture relative movement to avoid instantaneous teleport
        const movedPoint = dp.clone(this.state[this.movingPoint]);
        const movedBy = dp.diff(this.mousePoint, newMousePoint);
        movedPoint.x += movedBy.x;
        movedPoint.y += movedBy.y;

        this.mousePoint = newMousePoint;
        this.setState({[this.movingPoint]: movedPoint});
    };

    renderCode() {

        return (
            <pre className="demo-code">
                const p1 = {point(this.state.p1)};{'\n'}
                const p2 = {point(this.state.p2)};{'\n'}
                p2.cp1 = {point(this.state.cp1)};{'\n'}
                p2.cp2 = {point(this.state.cp2)};{'\n'}
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
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onMouseMove={this.handleMouseMove}
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