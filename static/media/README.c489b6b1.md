## Closing Paths
Any path where the last end point is the first start point is closed.
If you call `ctx.fill()` when the path isn't closed, the default behaviour
is to close the shape with a straight line from the last end point to the
first start point.

Note that `drawPoints` only moves the pen (drawing). You have control over
whether to fill or stroke the drawn shape (rendering).
