import { Stack } from "@mui/joy";
import { getBlogPosts } from "./api/contentful";

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <Stack position="relative">
      {posts.items.map((post) => post.fields.title)}
    </Stack>
  );
}
