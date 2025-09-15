"use server";

import { cookies } from "next/headers";

export type FavCity = { name: string; latitude: number; longitude: number };

const COOKIE = "wi:favorites";

export async function getFavorites(): Promise<FavCity[]> {
  const raw = cookies().get(COOKIE)?.value;
  if (!raw) return [];
  try { return JSON.parse(raw) as FavCity[]; } catch { return []; }
}

export async function toggleFavorite(city: FavCity) {
  const jar = cookies();
  const list = await getFavorites();
  const exists = list.some(c => c.name === city.name && c.latitude === city.latitude && c.longitude === city.longitude);
  const next = exists ? list.filter(c => !(c.name === city.name && c.latitude === city.latitude && c.longitude === city.longitude)) : [...list, city];
  jar.set(COOKIE, JSON.stringify(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
}
