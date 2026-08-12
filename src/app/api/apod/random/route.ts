import { getRandomApods } from "@/lib/nasa/client";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getRandomApods();

  if (!result.ok) {
    return NextResponse.json(result.error, { status: 500 });
  }

  return NextResponse.json(result.data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
