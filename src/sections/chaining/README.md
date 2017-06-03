## Chaining Curves Into Paths
Simply define the next end point (along with any control points),
and pass it to drawPoints. The previous end point will be used
as the new start point. A **path** is one or more connected curves
(the end point of one curve is the start point of the next).