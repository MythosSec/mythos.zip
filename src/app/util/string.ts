export const encodeClassName = (name: string) =>
  name
    .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
    .replace(" ", "-")
    .toLowerCase();

export const decodeClassName = (name: string) =>
  name
    .split("-")
    .map((slice) => slice[0].toUpperCase() + slice.substring(1))
    .join(" ");

export const parseHost = (url: string) => {
  const u = new URL(url);
  const port = u.port === "80" || u.port === "443" ? "" : ":" + u.port;
  return `${u.protocol}//${u.hostname}${port}`;
};
