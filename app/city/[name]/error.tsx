"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="card p-6">
      <h2 className="font-semibold">Ups, coś poszło nie tak</h2>
      <p className="text-sm opacity-70">{error.message}</p>
    </div>
  );
}
