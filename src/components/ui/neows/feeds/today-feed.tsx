import { getTodayNeos } from "@/lib/nasa/client";
import { notFound } from "next/navigation";
import NeoFeed from "./feed-content";

export default async function TodayFeed() {
  const neows = await getTodayNeos();
  if (!neows.ok) notFound();

  return <NeoFeed neo={neows.data} />;
}
