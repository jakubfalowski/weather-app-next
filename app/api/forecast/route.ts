export const runtime = "edge";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) return new NextResponse("Missing coordinates", { status: 400 });

  const upstream = new URL("https://api.open-meteo.com/v1/forecast");
  upstream.searchParams.set("latitude", lat);
  upstream.searchParams.set("longitude", lon);
  upstream.searchParams.set("daily", [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max"
  ].join(","));
  upstream.searchParams.set("timezone", "auto");

  const r = await fetch(upstream.toString(), { cache: "force-cache" });
  const data = await r.json();

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" }
  });
}
