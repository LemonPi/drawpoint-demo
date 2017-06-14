## Construction
Curves are defined by the start (p1) and end (p2) draw points.
The control points (cp1, cp2) attached to p2 determine the curve
degree (linear, quadratic, or cubic). 
This simplifies the case where an end point is the start point of the next curve segment
(see below).

Linear curves have no control points, quadratic curves have either cp1 or cp2
attached to p2, and cubic curves have both. Higher order curves aren't supported
because the native API can't efficiently draw them.

All operations apply the same way to curves of all degrees unless specified, and most of
the time you just pass in p1 and p2 without caring about its degree.

After construction a point's dimensions can be directly accessed and modified through
`p1.x` and `p1.y`. 