import { format, parse } from "date-fns";

export function parsePostDate(str: string) {
  const date = parse(str, "yyyy-MM-dd", new Date());
  return format(date, "MMM d, yyyy");
}
