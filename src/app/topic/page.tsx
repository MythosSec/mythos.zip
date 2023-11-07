import { Stack } from "@mui/joy";
import { getTags } from "../api/contentful";
import Tags from "../components/tags/Tags";

export default async function TagsPage() {
  const tags = await getTags();
  return (
    <Stack>
      <Tags tags={tags.items} />
    </Stack>
  );
}
