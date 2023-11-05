"use client";
import { useContext, useEffect } from "react";
import PostsContext from "./usePostsContext";
import { Divider, Stack, useTheme } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import { useMediaQuery } from "@mui/material";
import PostsScroller from "./PostsScroller";
import PostsLinkLatest from "./PostsLinkLatest";

export default function Posts({
  initialPosts,
}: {
  initialPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { posts, loading, setPosts } = useContext(PostsContext);

  useEffect(() => setPosts(initialPosts), []);
  const currentPosts = posts.length === 0 ? initialPosts.items : posts;
  const [latest, ...rest] = currentPosts;

  return (
    <Stack>
      <PostsLinkLatest post={latest} />
      <Divider sx={{ my: isSm ? 6 : 12 }} />
      <Stack>
        <PostsScroller posts={rest} loading={loading} />
      </Stack>
    </Stack>
  );
}
