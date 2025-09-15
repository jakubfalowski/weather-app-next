import { ReactNode } from "react";

export default function ForecastCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
