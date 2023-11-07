"use client";
import { useCallback } from "react";
import { Stack, Typography, Divider, useTheme } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { useMediaQuery } from "@mui/material";
import { TypePageBlogPost } from "@/app/api/contentful/types";
import PostsScroller from "../posts/PostsScroller";

export default function SeriesItem({
  name,
  id,
  initialPosts,
}: {
  name: string;
  id: string;
  initialPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchPosts = useCallback(async (limit: number, page: number) => {
    const response = await fetch(
      `/api/v1/getBlogPostsBySeriesId?seriesId=${id}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  }, []);

  const { data, loading, finished } = useInfiniteScroll<
    Omit<TypePageBlogPost, "content" | "featuredImage">,
    Awaited<ReturnType<typeof getBlogPosts>>
  >({ initialData: initialPosts.items, fetch: fetchPosts });
  const rest = data.length > 0 ? data : initialPosts.items;

  return (
    <Stack>
      <Typography>Series</Typography>
      <Typography level="h1" ml={-0.3}>
        {name}
      </Typography>
      <Divider sx={{ my: isSm ? 6 : 12 }} />
      <PostsScroller
        posts={rest}
        loading={loading}
        finished={finished}
        showSeries={false}
      />
    </Stack>
  );
}
