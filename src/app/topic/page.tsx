import { Stack } from "@mui/joy";
import { getTags } from "../api/contentful";
import Tags from "../components/tags/Tags";
import { ResolvingMetadata, Metadata } from "next";

export default async function TagsPage() {
  const tags = await getTags();
  return (
    <Stack>
      <Tags tags={tags.items} />
    </Stack>
  );
}

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadata = await parent;
  return {
    ...(metadata as any),
    title: "Topics",
  };
}
