import { Suspense } from "react";
import CitySearch from "@/components/CitySearch";
import FavoritesClient from "@/components/Favorites.client";
import Hero from "@/components/Hero";

export default async function Page() {
  return (
    <div className="space-y-8">
      <Hero>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Prognoza pogody prostsza niz myślisz</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-prose">Interaktywne demo: wyszukaj miasto, zobacz 7‑dniową prognozę, dodaj do ulubionych</p>
        <CitySearch />
      </Hero>
      <FavoritesClient />
    </div>
  );
}
