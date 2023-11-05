import { getBlogPosts } from "@/app/api/contentful";
import { Stack, StackProps, Typography } from "@mui/joy";
import PostsLink from "./PostsLink";

export default function PostsScroller({
  posts,
  loading,
  ...props
}: {
  loading: boolean;
  posts: Awaited<ReturnType<typeof getBlogPosts>>["items"];
} & StackProps) {
  return (
    <Stack {...props}>
      {posts.map((post, index) => (
        <PostsLink key={index} mt={12} post={post} />
      ))}
      {loading && <Typography>Loading...</Typography>}
    </Stack>
  );
}
