import { format, parse } from "date-fns";

export function parsePostDate(str: string) {
  const form = str.length === 10 ? "yyyy-MM-dd" : "yyyy-MM-dd'T'HH:mm";
  const date = parse(str, form, new Date());
  return format(date, "MMM d, yyyy");
}
