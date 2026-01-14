"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

interface KnowledgeChartProps {
  data: number[]
}

export function KnowledgeChart({ data }: KnowledgeChartProps) {
  const chartData = [
    { subject: "Algebra", value: data[0] },
    { subject: "Calculus", value: data[1] },
    { subject: "Geometry", value: data[2] },
    { subject: "Statistics", value: data[3] },
    { subject: "Trig", value: data[4] },
    { subject: "Number Theory", value: data[5] },
  ]

  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
        <Radar
          name="Mastery"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
