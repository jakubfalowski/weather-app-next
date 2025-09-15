import { Suspense } from "react";
import { z } from "zod";
import { notFound } from "next/navigation";
import { geocode } from "@/lib/openMeteo";
import FavoriteToggle from "@/components/FavoriteToggle";

export const revalidate = 600;

const qp = z.object({ lat: z.coerce.number().optional(), lon: z.coerce.number().optional() });
const isExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

async function ServerForecastSection() { return (await import("@/components/ForecastSection")).default; }
async function ClientForecastSection() { return (await import("@/components/ForecastSection.client")).default; }

export default async function CityPage({ params, searchParams }: { params: { name: string }; searchParams: unknown }) {
  const { name } = params;
  const { lat, lon } = qp.parse(searchParams);

  if (isExport) {
    const ClientSection = await ClientForecastSection();
    const latitude = typeof lat === "number" ? lat : 52.2297;
    const longitude = typeof lon === "number" ? lon : 21.0122;
    const city = { name: decodeURIComponent(name), latitude, longitude };
    return (
      <div className="space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{city.name} (static export)</h1>
            <p className="text-sm opacity-70">{city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}</p>
          </div>
          <FavoriteToggle city={city} />
        </header>
        <Suspense fallback={<div className="card p-6 animate-pulse">Ładowanie prognozy…</div>}>
          <ClientSection lat={city.latitude} lon={city.longitude} />
        </Suspense>
      </div>
    );
  }

  let latitude = lat;
  let longitude = lon;

  if (latitude == null || longitude == null) {
    const results = await geocode(name, { count: 1, language: "pl" });
    const first = results.results?.[0];
    if (!first) notFound();
    latitude = first.latitude; longitude = first.longitude;
  }

  const city = { name: decodeURIComponent(name), latitude: latitude!, longitude: longitude! };


  const ServerSection = await ServerForecastSection();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{city.name}</h1>
          <p className="text-sm opacity-70">{city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}</p>
        </div>
        <FavoriteToggle city={city} />
      </header>
      <Suspense fallback={<div className="card p-6 animate-pulse">Ładowanie prognozy…</div>}>
        <ServerSection lat={city.latitude} lon={city.longitude} />
      </Suspense>
    </div>
  );
}
