"use client";
import { useRef, useEffect, useCallback } from "react";
import UserCard from "@/components/UserCard";
import type { User } from "@/app/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../actions/fetchUsers";
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }

  const allUsers: User[] = data?.pages.flatMap((page) => page.users) ?? [];

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>
      <div className="space-y-4 p-4 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allUsers.map((user, i) => (
          <UserCard key={user.id + "-" + i} user={user} />
        ))}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}
