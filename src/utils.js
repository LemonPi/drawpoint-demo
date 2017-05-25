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
 * Creates handlers for a canvas for moving certain points, and is responsible for updating
 * the component's state. Requires a canvas ref to an HTML canvas to exist.
 * @param component
 * @param canvas A reference to the DOM canvas
 * @param pointNames A list of keys into the component's state that should return points
 * @returns {{handleMouseDown: (function(*=)), handleMouseUp: (function()), handleMouseMove: (function(*=))}}
 */
export function interactionFactory(component, canvas, pointNames) {
    let mousePoint = null;
    let movingPoint = null;
    let moving = false;

    return {
        handleMouseDown (e)  {
            mousePoint = getMousePoint(e);

            pointNames.forEach((p) => {
                if (dp.norm(dp.diff(component.state[p], mousePoint)) < 10) {
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

            let movingNearPoint = false;
            pointNames.forEach((p) => {
                if (dp.norm(dp.diff(component.state[p], newMousePoint)) < 10) {
                    movingNearPoint = true;
                }
            });

            canvas.style.cursor = movingNearPoint ? "pointer" : "default";

            if (moving === false) {
                return;
            }

            // we want to capture relative movement to avoid instantaneous teleport
            const movedPoint = dp.clone(component.state[movingPoint]);
            const movedBy = dp.diff(mousePoint, newMousePoint);
            movedPoint.x += movedBy.x;
            movedPoint.y += movedBy.y;

            mousePoint = newMousePoint;
            component.setState({[movingPoint]: movedPoint});
        },

    };
}

/**
 * Component factory for basic demos. Given the initial state (includes all the points),
 * list of points to add interactivity to, canvas drawing method, and code representation method,
 * create a boiler-plated component.
 * @param name Name of the component to create
 * @param state Initial state
 * @param points List of string names (state keys) that should become interactable points
 * @param draw Method for drawing state to canvas
 * @param renderCode Method for rendering state to code
 * @returns {BasicDemo} Component
 */
export function createBasicDemo(name, {state, points, draw, renderCode}) {
    class BasicDemo extends React.Component {
        constructor(props) {
            super(props);
            this.state = state;
            this.handler = {};

            // subsequent initialization calls in order
            // componentWillMount
            // render (must be pure)
            // componentDidMount
        }

        componentDidMount() {
            // we can only access the DOM here (the canvas)
            const ctx = this.refs.canvas.getContext('2d');
            draw(ctx, this.state);
            this.handler = interactionFactory(this, this.refs.canvas, points);
            this.forceUpdate();
        }

        componentDidUpdate() {
            const ctx = this.refs.canvas.getContext('2d');
            ctx.clearRect(0, 0, 200, 200);
            draw(ctx, this.state);
        }

        render() {
            // no DOM operations (e.g. drawing on canvas) should take place here
            return (
                <div className="demo-unit">
                    <canvas width="200" height="200" ref="canvas"
                            onMouseDown={this.handler.handleMouseDown}
                            onMouseUp={this.handler.handleMouseUp}
                            onMouseMove={this.handler.handleMouseMove}
                            className="demo-canvas"></canvas>
                    {renderCode(this.state)}
                </div>
            );
        }
    }
    BasicDemo.displayName = name;
    return BasicDemo;
}
