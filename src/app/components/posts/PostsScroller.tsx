import { getBlogPosts } from "@/app/api/contentful";
import { Stack, StackProps, Typography } from "@mui/joy";
import PostsLink from "./PostsLink";

export default function PostsScroller({
  posts,
  loading,
  finished = false,
  showSeries = true,
  ...props
}: {
  loading: boolean;
  finished?: boolean;
  posts: Awaited<ReturnType<typeof getBlogPosts>>["items"];
  showSeries?: boolean;
} & StackProps) {
  return (
    <Stack {...props}>
      {posts.map((post, index) => (
        <PostsLink key={index} mt={12} post={post} showSeries={showSeries} />
      ))}
      {loading && <Typography mt={12}>Loading...</Typography>}
      {finished && (
        <Typography mt={12}>You&apos;ve reached the end.</Typography>
      )}
    </Stack>
  );
}
