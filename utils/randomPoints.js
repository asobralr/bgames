import { letterWidth } from '../constants/Dimensions';

function distance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

function validateDistance(array, x, y, pointRadius) {
  let validated = true;
  array.forEach((point) => {
    if (distance(point.x, point.y, x, y) < letterWidth * 2) {
      validated = false;
    }
  });
  return validated;
}

const defineRandomPoints = (array, boundaries, pointRadius = letterWidth) => {
  const { leftLimit, rightLimit, bottomLimit, topLimit } = boundaries;
  const points = [];
  while (points.length < array.length) {
    const x = Math.random() * (rightLimit - leftLimit) + leftLimit;
    const y = Math.random() * (bottomLimit - topLimit) + topLimit;
    if (validateDistance(points, x, y, pointRadius)) {
      points.push({ x, y });
    }
  }
  return points;
};

export default defineRandomPoints;
