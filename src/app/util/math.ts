export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function clamp(value: number, max: number, min = 0) {
  let v = value;
  if (v > max) {
    v = max;
  }
  return v < min ? min : v;
}

export function calculateVerticalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Element | null | undefined
) {
  if (!root) return 0;
  const vh = root.clientHeight || 0;
  const offset = threshold * bounds.height;
  const percentage =
    (bounds.bottom - offset) / (vh + bounds.height - offset * 2);

  return 1 - Math.max(0, Math.min(1, percentage));
}

export function calculateHorizontalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Element | null | undefined
) {
  if (!root) return 0;
  const vw = root.clientWidth || 0;
  const offset = threshold * bounds.width;
  const percentage = (bounds.right - offset) / (vw + bounds.width - offset * 2);

  return 1 - Math.max(0, Math.min(1, percentage));
}
