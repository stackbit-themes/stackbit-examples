export const columnBreakpoints = {
  default: 3,
  500: 1,
};
export const imageRelativeSizes = "(max-width: 500px) 100vw, 33vw";

const stops = {
  none: [],
  responsive: [300, 400, 600, 800, 1000],
  aggressive: [300],
};
const defaultStops = stops["responsive"];

export function imageStops(resizeMethod) {
  return stops[resizeMethod] || defaultStops;
}
