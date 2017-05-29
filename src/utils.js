/**
 * Created by Johnson on 2017-05-25.
 */
import React from 'react';
import * as dp from "drawpoint";

export function point(p) {
    return `dp.point(${dp.roundToDec(p.x)}, ${dp.roundToDec(p.y)})`;
}

export function getMousePoint(e) {
    e = e || window.event;
    const target = e.target || e.srcElement,
        rect = target.getBoundingClientRect();
    return dp.point(e.clientX - rect.left, e.clientY - rect.top);
}

/**
 * Create handlers for mouse moving over a canvas.
 * @param getPoints Function that returns an object holding points that can be interacted with
 * @param canvas A reference to the DOM canvas
 * @param handlePointMove  Function to call whenever a point moved, passing
 *  {movedPointKey: point from getPoints that moved, movedPoint: that point after moving}
 * @returns {{handleMouseDown: (function(*=)), handleMouseUp: (function()), handleMouseMove: (function(*=))}}
 */
function interactiveFactory(getPoints, canvas, handlePointMove) {
    let mousePoint = null;
    let movingPoint = null;
    let moving = false;

    return {
        handleMouseDown (e)  {
            mousePoint = getMousePoint(e);
            const points = getPoints();

            Object.keys(points).forEach((p) => {
                if (dp.norm(dp.diff(points[p], mousePoint)) < 10) {
                    moving = true;
                    movingPoint = p;
                }
            });
        },

        handleMouseUp  ()  {
            if (moving === false) {
                return;
            }

            canvas.style.cursor = "default";

            moving = false;
            movingPoint = null;
        },

        handleMouseMove  (e)  {
            const newMousePoint = getMousePoint(e);
            const points = getPoints();

            let movingNearPoint = false;
            Object.keys(points).forEach((p) => {
                if (dp.norm(dp.diff(points[p], newMousePoint)) < 10) {
                    movingNearPoint = true;
                }
            });

            canvas.style.cursor = movingNearPoint ? "pointer" : "default";

            if (moving === false) {
                return;
            }

            // we want to capture relative movement to avoid instantaneous teleport
            const movedPoint = dp.clone(points[movingPoint]);
            const movedBy = dp.diff(mousePoint, newMousePoint);
            movedPoint.x += movedBy.x;
            movedPoint.y += movedBy.y;

            mousePoint = newMousePoint;
            handlePointMove({
                movedPoint,
                movedPointKey: movingPoint
            });
        },

    };
}


/**
 * Thin canvas component that holds no state, instead acting as an interaction interface for
 * manipulating passed in points through callbacks.
 *
 * props should have these following callbacks:
 * getPoints() - returns an object holding points to allow interaction with
 * handlePointMove(e) - called whenever a point gets moved
 *  e.movedPointKey is the key corresponding from the object getPoints() returned that moved
 *  e.movedPoint is the new point of that key
 * handleCanvasUpdate(ctx) - called whenever the canvas should be updated (entire canvas cleared
 * each time). Caller should draw on this fresh canvas.
 */
export class InteractiveCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.handler = {};
        this.width = props.width || 200;
        this.height = props.height || 200;

        // subsequent initialization calls in order
        // componentWillMount
        // render (must be pure)
        // componentDidMount
    }

    handlePointMove = (e) => {
        // since state is held by parent, canvas doesn't know anything
        this.props.handlePointMove(e);
        // redraw each time point moves
        this.draw();
    };

    // expose as separate function so parents have the option of force calling it via refs
    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        this.props.handleCanvasUpdate(ctx);
    }

    componentDidMount() {
        // we can only access the DOM here (the canvas)
        this.handler =
            interactiveFactory(this.props.getPoints, this.refs.canvas, this.handlePointMove);
        this.forceUpdate();
        // initial draw
        this.draw();
    }

    render() {
        return (
            <canvas width={this.width} height={this.height} ref="canvas"
                    onMouseDown={this.handler.handleMouseDown}
                    onMouseUp={this.handler.handleMouseUp}
                    onMouseMove={this.handler.handleMouseMove}
                    className="demo-canvas"></canvas>
        );
    }
}