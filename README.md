# 🌦️ Weather Insights

Aplikacja demo w **Next.js 14 (App Router)** pokazująca:
- **SSR i CSR** (Server Components + Client Components),
- **wydajność** (dynamic import, cache, Suspense, optymistyczne UI),
- **trwały stan użytkownika** (ulubione w localStorage),
- **CI/CD na GitLab Pages** (static export).

## ✨ Funkcje

- Wyszukiwanie miasta z debounce
- Prognoza pogody (Open-Meteo API) z wykresami (Recharts)
- Dodawanie miast do ulubionych (localStorage)
- SSR (przy starcie w Node/Edge) i fallback **static export** (GitLab Pages)
- Tailwind + Framer Motion (animacje, karty)
- Error boundaries (`app/error.tsx`, `app/not-found.tsx`)

---

## 🚀 Uruchomienie

### Dev
```bash
npm i
npm dev
# http://localhost:3000
```

### Produkcja (SSR)
```bash
npm build
npm start
# -> działa na .next/ (serwer Node/Edge)
```

### Static export (np. GitLab Pages)
```bash
npm run export
npx serve out -l 3000
# -> działa z out/ jako czysty static hosting
```

---

## Stack

- **Next.js 14** (App Router, Server Components, Route Handlers)
- **TypeScript** z restrykcyjnym typowaniem
- **TailwindCSS** + **lucide-react** ikony
- **Recharts** (dynamic import wykresu)
- **Framer Motion** (animacje klientowe)
- **localStorage** do zarządzania ulubionymi
- **npm** jako package manager

---

## 📂 Struktura

```
app/
 ├─ page.tsx             # landing page z wyszukiwarką + ulubione
 ├─ city/[name]/page.tsx # strona miasta z prognozą
 ├─ error.tsx            # globalny error boundary
 └─ not-found.tsx        # 404

components/
 ├─ CitySearch.tsx       # wyszukiwarka z debounce
 ├─ FavoriteToggle.tsx   # przycisk dodaj/usuń z ulubionych (localStorage)
 ├─ Favorites.client.tsx # lista ulubionych (client-only)
 ├─ Chart.tsx            # wykres temperatur
 └─ Hero.tsx             # animowana sekcja (Framer Motion)

lib/
 └─ types.ts             # typy ForecastResponse
```

---

## ⚙️ CI/CD (GitLab Pages)

- `.gitlab-ci.yml` zawiera pipeline:
  - `install` → `build` → `pages`
- Static export publikowany do `public/`
- Obsługuje basePath (`/$CI_PROJECT_NAME`) dla GitLab Pages

---

## 📝 Licencja

MIT — do dowolnego użytku i dalszego rozwijania 🚀
