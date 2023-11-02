export function documentHeight(target?: Element) {
  if (typeof window === "undefined") {
    return 0;
  }
  let ttarget = typeof target === "undefined" ? document.body : target;
  return Math.max(ttarget.scrollHeight, ttarget.clientHeight);
}

export function documentWidth(target?: Element) {
  if (typeof window === "undefined") {
    return 0;
  }
  let ttarget = typeof target === "undefined" ? document.body : target;
  return Math.max(ttarget.scrollWidth, ttarget.clientWidth);
}

export function scrollTop() {
  const totalDocScrollLength = documentHeight() - window.innerHeight;
  return window.scrollY / totalDocScrollLength;
}
