"use client";

import { useTransition, useState, useEffect } from "react";
import { Heart } from "lucide-react";

export type FavCity = { name: string; latitude: number; longitude: number };
const KEY = "wi:favorites";

function readLS(): FavCity[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function writeLS(list: FavCity[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export default function FavoriteToggle({ city }: { city: FavCity }) {
  const [pending, startTransition] = useTransition();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const list = readLS();
    const exists = list.some(c => c.name === city.name && c.latitude === city.latitude && c.longitude === city.longitude);
    setIsFav(exists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city.name, city.latitude, city.longitude]);

  async function onSubmit() {
    startTransition(() => {
      const list = readLS();
      const exists = list.some(c => c.name === city.name && c.latitude === city.latitude && c.longitude === city.longitude);
      const next = exists ? list.filter(c => !(c.name === city.name && c.latitude === city.latitude && c.longitude === city.longitude)) : [...list, city];
      writeLS(next);
      setIsFav(!exists);
      try { window.dispatchEvent(new StorageEvent("storage", { key: KEY } satisfies StorageEventInit)); } catch {}
    });
  }

  return (
    <form action={onSubmit}>
      <button type="submit" className={"inline-flex items-center gap-2 text-sm border px-3 py-1.5 rounded-full hover:shadow-sm " + (isFav ? "bg-pink-50 dark:bg-pink-900/20" : "")}>
        <Heart className="size-4" /> {pending ? "Zapisywanie…" : isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      </button>
    </form>
  );
}
