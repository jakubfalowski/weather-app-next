import dynamic from "next/dynamic";
import ForecastCard from "./ForecastCard";
import { getForecast } from "@/lib/openMeteo";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false, loading: () => <div className="h-60 animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-800/60" /> });

export default async function ForecastSection({ lat, lon }: { lat: number; lon: number }) {
  const data = await getForecast(lat, lon);

  const day = data.daily.time.map((t, i) => ({
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
          {data.daily.time.map((t, i) => (
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
