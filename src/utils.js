/**
 * Created by Johnson on 2017-05-25.
 */
import * as dp from "drawpoint";

export function point(p) {
    return `dp.point(${p.x}, ${p.y})`;
}

export function getMousePoint(e) {
    e = e || window.event;
    const target = e.target || e.srcElement,
        rect = target.getBoundingClientRect();
    return dp.point(e.clientX - rect.left, e.clientY - rect.top);
}


export function interactionFactory(context, pointNames) {
    let mousePoint = null;
    let movingPoint = null;
    let moving = false;

    return {
        handleMouseDown (e)  {
            mousePoint = getMousePoint(e);

            pointNames.forEach((p) => {
                if (dp.norm(dp.diff(context.state[p], mousePoint)) < 10) {
                    moving = true;
                    movingPoint = p;
                }
            });
        },

        handleMouseUp  ()  {
            if (moving === false) {
                return;
            }

            context.refs.canvas.style.cursor = "default";

            moving = false;
            movingPoint = null;
        },

        handleMouseMove  (e)  {
            const newMousePoint = getMousePoint(e);

            let movingNearPoint = false;
            pointNames.forEach((p) => {
                if (dp.norm(dp.diff(context.state[p], newMousePoint)) < 10) {
                    movingNearPoint = true;
                }
            });

            context.refs.canvas.style.cursor = movingNearPoint ? "pointer" : "default";

            if (moving === false) {
                return;
            }

            // we want to capture relative movement to avoid instantaneous teleport
            const movedPoint = dp.clone(context.state[movingPoint]);
            const movedBy = dp.diff(mousePoint, newMousePoint);
            movedPoint.x += movedBy.x;
            movedPoint.y += movedBy.y;

            mousePoint = newMousePoint;
            context.setState({[movingPoint]: movedPoint});
        },

    };
}
