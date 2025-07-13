"use client";
import { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import UserCard from "@/components/UserCard";
import { fetchUsers } from "../actions/fetchUsers";
import type { User } from "@/app/types/types";
import Loading from "./loading";

export default function UserFeed() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextSkip = allPages.length * 10;
        return nextSkip >= lastPage.total ? undefined : nextSkip;
      },
    });

  const allUsers: User[] = data?.pages.flatMap((page) => page.users) ?? [];

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const observeBottom = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    observeBottom();
  }, [observeBottom]);

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-red-500">{(error as Error).message}</div>;

  const cardHeight = 250;
  const cardWidth = 300;

  return (
    <div className="h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div style={{ height: "80vh" }}>
        <AutoSizer>
          {({ height, width }) => {
            const columnCount = Math.floor(width / cardWidth);
            const rowCount = Math.ceil(allUsers.length / columnCount);

            return (
              <Grid
                columnCount={columnCount}
                columnWidth={cardWidth}
                height={height}
                rowCount={rowCount}
                rowHeight={cardHeight}
                width={width}
              >
                {({ rowIndex, columnIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  const user = allUsers[index];
                  if (!user) return null;
                  return (
                    <div style={style}>
                      <UserCard user={user} />
                    </div>
                  );
                }}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
