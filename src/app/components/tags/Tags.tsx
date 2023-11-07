import { getTags } from "@/app/api/contentful";
import { Stack, Typography } from "@mui/joy";
import TagLink from "./TagLink";

export default function Tags({
  tags,
}: {
  tags: Awaited<ReturnType<typeof getTags>>["items"];
}) {
  return (
    <Stack>
      <Typography level="h1">Topics</Typography>
      <Stack mt={4}>
        {tags
          .filter((tag) => !tag.internalOnly)
          .map((tag) => (
            <TagLink key={tag.name} tag={tag} />
          ))}
      </Stack>
    </Stack>
  );
}
