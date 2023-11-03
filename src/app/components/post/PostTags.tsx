import { BlogPostSkeleton } from "@/app/api/contentful";
import { encodeClassName } from "@/app/util/string";
import { Stack, StackProps, Typography } from "@mui/joy";
import LinkList from "./LinkList";
import { tagRoute } from "@/app/routes";

const gutterWidth = 180;

export default function PostTags({
  tags,
  ...props
}: StackProps & {
  tags: BlogPostSkeleton["fields"]["tags"];
}) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Stack flexDirection="row" position="relative" {...props}>
      <Stack minWidth={gutterWidth}>
        <Typography level="title-lg" mt={1.5}>
          Tags
        </Typography>
      </Stack>
      <Stack flexDirection="row" px={4}>
        <LinkList
          links={tags
            .filter(({ fields: { internalOnly } }) => !internalOnly)
            .map(({ fields: { name } }) => ({
              name,
              url: tagRoute(name),
            }))}
        />
      </Stack>
    </Stack>
  );
}
