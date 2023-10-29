export function documentHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

export function scrollTop() {
  const totalDocScrollLength = documentHeight() - window.innerHeight;
  return window.scrollY / totalDocScrollLength;
}
