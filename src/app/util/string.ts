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
