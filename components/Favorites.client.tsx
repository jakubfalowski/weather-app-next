"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type FavCity = { name: string; latitude: number; longitude: number };
const KEY = "wi:favorites";

export default function FavoritesClient() {
  const [favs, setFavs] = useState<FavCity[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try { const raw = localStorage.getItem(KEY); setFavs(raw ? JSON.parse(raw) : []); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!favs.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Ulubione</h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {favs.map((c, i) => (
          <li key={`${c.name}-${i}`} className="card p-3">
            <Link href={`/city/${encodeURIComponent(c.name)}?lat=${c.latitude}&lon=${c.longitude}`} className="font-medium">
              {c.name}
            </Link>
            <div className="text-xs opacity-70">{c.latitude.toFixed(2)}, {c.longitude.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
