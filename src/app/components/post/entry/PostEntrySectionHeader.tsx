import { Typography } from "@mui/joy";
import { IComponentSectionHeaderFields } from "../../../../../types/contentful";
import { encodeClassName } from "@/app/util/string";

export default function PostEntrySectionHeader({
  title,
}: IComponentSectionHeaderFields) {
  return (
    <Typography level="h4" id={`#${encodeClassName(title)}`}>
      {title}
    </Typography>
  );
}
