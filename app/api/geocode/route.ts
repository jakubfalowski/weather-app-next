export const runtime = "edge";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const count = searchParams.get("count") || "6";
  const lang = searchParams.get("lang") || "en";

  const upstream = new URL("https://geocoding-api.open-meteo.com/v1/search");
  upstream.searchParams.set("name", q);
  upstream.searchParams.set("count", count);
  upstream.searchParams.set("language", lang);
  upstream.searchParams.set("format", "json");

  const r = await fetch(upstream.toString(), { cache: "force-cache" });
  const data = await r.json();

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }
  });
}
