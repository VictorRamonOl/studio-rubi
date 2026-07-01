"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

type Datum = { label: string; value: number };

export function BarChartCard({
  data,
  color = "#681D31",
  brl = false,
  height = 200,
}: {
  data: Datum[];
  color?: string;
  brl?: boolean;
  height?: number;
}) {
  const fmt = (v: number) =>
    brl ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : String(v);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#8B7A74" }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(104,29,49,0.06)" }}
            formatter={(v) => [fmt(Number(v)), ""]}
            contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 13 }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
