import { ForecastResponse, GeocodeResponse } from "./types";

export async function geocode(name: string, opts?: { count?: number; language?: string }) {
  const isExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
  if (isExport) {
    const upstream = new URL("https://geocoding-api.open-meteo.com/v1/search");
    upstream.searchParams.set("name", name);
    upstream.searchParams.set("count", String(opts?.count ?? 1));
    upstream.searchParams.set("language", opts?.language ?? "pl");
    upstream.searchParams.set("format", "json");
    const res = await fetch(upstream, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) throw new Error("Geocoding failed");
    return (await res.json()) as GeocodeResponse;
  }

  const url = new URL("/api/geocode", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  url.searchParams.set("q", name);
  if (opts?.count) url.searchParams.set("count", String(opts.count));
  if (opts?.language) url.searchParams.set("lang", opts.language);

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!res.ok) throw new Error("Geocoding failed");
  return (await res.json()) as GeocodeResponse;
}

export async function getForecast(lat: number, lon: number) {
  const isExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
  if (isExport) {
    const upstream = new URL("https://api.open-meteo.com/v1/forecast");
    upstream.searchParams.set("latitude", String(lat));
    upstream.searchParams.set("longitude", String(lon));
    upstream.searchParams.set("daily", [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max"
    ].join(","));
    upstream.searchParams.set("timezone", "auto");
    const res = await fetch(upstream, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("Forecast failed");
    return (await res.json()) as ForecastResponse;
  }

  const url = new URL("/api/forecast", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Forecast failed");
  return (await res.json()) as ForecastResponse;
}
