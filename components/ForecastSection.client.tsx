"use client";

import ForecastCard from "./ForecastCard";
import Chart, { Point } from "@/components/Chart";
import { ForecastResponse } from "@/lib/types";
import { useEffect, useState } from "react"

async function fetchForecast(lat: number, lon: number): Promise<ForecastResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("daily", ["temperature_2m_max","temperature_2m_min","precipitation_probability_max"].join(","));
  url.searchParams.set("timezone", "auto");
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("Forecast failed");
  return r.json();
}

export default function ForecastSectionClient({ lat, lon }: { lat: number; lon: number }) {
  const [data, setData] = useState<ForecastResponse| null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchForecast(lat, lon).then(setData).catch(e => setErr(String(e)));
  }, [lat, lon]);

  if (err) return <div className="card p-4 text-sm text-red-600">Błąd: {err}</div>;
  if (!data) return <div className="card p-4 animate-pulse">Ładowanie prognozy…</div>;

  const day: Point[] = data.daily.time.map((t: string, i: number) => ({
    x: t.slice(5),
    y: data.daily.temperature_2m_max[i]
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ForecastCard title="Maksymalna temperatura (7 dni)">
        <Chart data={day} label="°C" />
      </ForecastCard>
      <ForecastCard title="Szczegóły">
        <ul className="text-sm grid grid-cols-2 gap-2">
          {data.daily.time.map((t: string, i: number) => (
            <li key={t} className="flex items-center justify-between border rounded-lg px-3 py-2">
              <span>{t}</span>
              <span>{Math.round(data.daily.temperature_2m_min[i])}–{Math.round(data.daily.temperature_2m_max[i])}°C</span>
            </li>
          ))}
        </ul>
      </ForecastCard>
    </div>
  );
}
