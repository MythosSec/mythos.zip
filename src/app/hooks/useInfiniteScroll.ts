import { useState, useEffect, useCallback } from "react";
import useScrollThreshold from "./useScrollThreshold";

export default function useInfiniteScroll<
  K,
  T extends { skip: number; limit: number; total: number; items: K[] },
>({
  initialData = [],
  threshold = 75,
  fetch,
}: {
  initialData?: K[];
  threshold?: number;
  fetch: (limit: number, page: number) => Promise<T>;
}) {
  const [{ data, page, loading, limit, finished }, setState] = useState<{
    data: K[];
    page: number;
    limit: number;
    finished: boolean;
    loading: boolean;
  }>({
    data: [],
    page: 0,
    limit: 10,
    finished: false,
    loading: false,
  });

  useEffect(() => setState((state) => ({ ...state, data: initialData })), []);

  const setData = useCallback(
    (data: T) =>
      setState((state) => {
        // naive post deduplication
        const nextPage = data.skip / data.limit + 1;
        if (nextPage <= state.page) {
          return state;
        }
        return {
          ...state,
          data: [...state.data, ...data.items],
          finished: nextPage * state.limit >= data.total,
          loading: false,
          page: nextPage,
        };
      }),
    []
  );

  const onThresholdMet = useCallback(async () => {
    if (finished) {
      return;
    }
    setState((state) => ({ ...state, loading: true }));
    const nextData = await fetch(limit, page + 1);
    setData(nextData);
  }, [page, finished, limit, setData, fetch]);

  useScrollThreshold({ onThresholdMet, threshold });

  return {
    loading,
    data,
    page,
    limit,
    finished,
  };
}
