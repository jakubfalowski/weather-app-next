"use client";

import useSWR from "swr";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const USE_PROXY = process.env.NEXT_PUBLIC_USE_PROXY === "true";
const fetcher = (url: string) => fetch(url).then(r => r.json());

function buildGeocodeUrl(q: string) {
  if (USE_PROXY) {
    return `/api/geocode?q=${encodeURIComponent(q)}&count=6&lang=pl`;
  }
  const upstream = new URL("https://geocoding-api.open-meteo.com/v1/search");
  upstream.searchParams.set("name", q);
  upstream.searchParams.set("count", "6");
  upstream.searchParams.set("language", "pl");
  upstream.searchParams.set("format", "json");
  return upstream.toString();
}

export default function CitySearch() {
  const [q, setQ] = useState("");
  const [pending, startTransition] = useTransition();
  const debounced = useDebounced(q, 200);

  const { data, isValidating } = useSWR(
    debounced.length >= 2 ? buildGeocodeUrl(debounced) : null,
    fetcher,
    { keepPreviousData: true }
  );

  const results: { name: string; country: string; latitude: number; longitude: number }[] = data?.results ?? [];

  return (
    <div className="card p-4">
      <label className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white/70 dark:bg-slate-900/70">
        <Search className="size-4 opacity-60" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Wpisz miasto… (min. 2 znaki)"
          className="w-full bg-transparent outline-none"
        />
      </label>

      <div className="mt-3 grid gap-2">
        {(isValidating || pending) && <div className="text-sm opacity-70">Szukam…</div>}
        {results.length > 0 && (
          <ul className="grid md:grid-cols-2 gap-2">
            {results.map((r, i) => (
              <li key={`${r.name}-${i}`}>
                <Link
                  href={`/city/${encodeURIComponent(r.name)}?lat=${r.latitude}&lon=${r.longitude}`}
                  className="block p-3 rounded-lg border hover:shadow-sm"
                >
                  {r.name}, {r.country}
                  <span className="text-xs opacity-60"> · {r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {debounced && results.length === 0 && !isValidating && (
          <div className="text-sm opacity-70">Brak wyników.</div>
        )}
      </div>
    </div>
  );
}

function useDebounced(value: string, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setDebounced(value), delay);
    return () => {
    if (t.current) {
      clearTimeout(t.current);
      t.current = null;
    }
  };
  }, [value, delay]);
  return debounced;
}
