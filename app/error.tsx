"use client";
export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="card p-6">
      <h2 className="font-semibold">Coś poszło nie tak</h2>
      <p className="text-sm opacity-70">{error.message}</p>
      <a href="/" className="underline text-sm">Wróć do startu</a>
    </div>
  );
}
