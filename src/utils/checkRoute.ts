export const checkIsSameRoute = (clientRoute: string, builtRoute: string): boolean => {
  // Get all segments of a route
  // For example: '/hello/123' --> ['hello', '123']
  const clientRouteSegments = clientRoute.split('/');
  const builtRouteSegments = builtRoute.split('/');

  // Find the all index of params in the built in route
  // For example: '/hello/:id/world/:id2' --> ['hello', ':id', 'world', ':id2'] --> [1, 3]
  const paramIndexes = builtRouteSegments
    .map((route, index) => {
      if (route[0] === ':') return index;
    })
    .filter((position) => position);

  // Check if both array have the same length
  if (clientRouteSegments.length === builtRouteSegments.length) {
    // Compare each element in the array
    for (let i = 0; i < clientRouteSegments.length; i++) {
      // If there are differences, check if that position in the clientRouteSegments
      // is in the paramIndexes. If true meaning that that segment is param.
      // If not meaning that that segment is not param and not equal to the builtRouteSegments.
      if (clientRouteSegments[i] !== builtRouteSegments[i]) {
        if (!paramIndexes.includes(i)) {
          return false;
        }
      }
    }
    return true;
  }

  return false;
};
