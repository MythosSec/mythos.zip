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
