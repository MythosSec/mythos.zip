"use client";
import { getBlogPosts } from "@/app/api/contentful";
import useScrollThreshold from "@/app/hooks/useScrollThreshold";
import { createContext, ReactNode, useCallback, useState } from "react";

interface PostsContextState {
  posts: Awaited<ReturnType<typeof getBlogPosts>>["items"][0][];
  page: number;
  limit: number;
  postsRemaining: boolean;
  loading: boolean;
}
interface PostsContextDispatch {
  setPosts: (posts: Awaited<ReturnType<typeof getBlogPosts>>) => void;
}

const defaultPostsContextState = {
  posts: [],
  page: 0,
  limit: 10,
  postsRemaining: true,
  loading: false,
};
const defaultPostsContextDispatch = {
  setPosts: () => {},
};

const PostsContext = createContext<PostsContextState & PostsContextDispatch>({
  ...defaultPostsContextState,
  ...defaultPostsContextDispatch,
});

export function PostsContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [{ posts, page, loading, limit, postsRemaining }, setState] =
    useState<PostsContextState>(defaultPostsContextState);

  const setPosts = useCallback(
    (data: Awaited<ReturnType<typeof getBlogPosts>>) =>
      setState((state) => {
        // naive post deduplication
        const nextPage = data.skip / data.limit + 1;
        if (nextPage <= state.page) {
          return state;
        }
        return {
          ...state,
          posts: [...state.posts, ...data.items],
          postsRemaining: state.page * state.limit < data.total,
          loading: false,
          page: nextPage,
        };
      }),
    []
  );

  const onThresholdMet = useCallback(async () => {
    if (!postsRemaining) {
      return;
    }
    setState((state) => ({ ...state, loading: true }));

    const response = await fetch(
      `/api/v1/getBlogPosts?page=${page + 1}&limit=${limit}`
    );
    const data = (await response.json()) as Awaited<
      ReturnType<typeof getBlogPosts>
    >;
    setPosts(data);
  }, [page, postsRemaining, limit, setPosts]);

  useScrollThreshold({ onThresholdMet });

  return (
    <PostsContext.Provider
      value={{
        posts,
        page,
        limit,
        postsRemaining,
        loading,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsContext;
