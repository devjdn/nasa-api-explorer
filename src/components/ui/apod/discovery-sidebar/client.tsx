"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApiResult, ApodResponse } from "@/lib/nasa/types";
import APODDiscoveryArticles from "./articles";
import { Separator } from "../../separator";
import { Button } from "../../button";
import { RefreshCwIcon } from "lucide-react";
import clsx from "clsx";
import { Skeleton } from "../../skeleton";

async function fetchRandomApods(): Promise<ApiResult<ApodResponse[]>> {
  const res = await fetch("/api/apod/random");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return { ok: true, data };
}

export default function APODDiscoverySidebarClient() {
  const { data, isPending, isFetching, refetch } = useQuery({
    queryKey: ["apod-random"],
    queryFn: fetchRandomApods,
    staleTime: Infinity,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col">
      <Button variant={"ghost"} onClick={() => refetch()} disabled={isFetching}>
        <RefreshCwIcon className={clsx({ "animate-spin": isFetching })} />
        <span>{isFetching ? "Fetching..." : "Refresh"}</span>
      </Button>

      <Separator />

      {isPending ? (
        Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-3/2 border-b" />
        ))
      ) : (
        <div className="flex flex-col">
          {data?.ok &&
            data.data.map((apod) => (
              <APODDiscoveryArticles
                key={apod.date}
                title={apod.title}
                date={apod.date}
                media_type={apod.media_type}
                image_url={apod.media_type === "image" ? apod.hdurl : undefined}
              />
            ))}
        </div>
      )}
    </div>
  );
}
