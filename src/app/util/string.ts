export const encodeClassName = (name: string) =>
  name
    .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
    .replace(" ", "-")
    .toLowerCase();
