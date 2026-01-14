// System metrics endpoint
import { NextResponse } from "next/server"
import { getEngineStats } from "@/lib/math-engine"
import { getAggregationStats } from "@/lib/aggregator"

const startTime = Date.now()

export async function GET() {
  const engineStats = getEngineStats()
  const aggregationStats = getAggregationStats()

  return NextResponse.json({
    activeConnections: 0,
    cacheHits: engineStats.cacheHits,
    cacheMisses: engineStats.cacheMisses,
    problemsProcessed: engineStats.problemsProcessed,
    solutionsGenerated: engineStats.solutionsGenerated,
    totalProblems: aggregationStats.totalProblems,
    uptimeSeconds: (Date.now() - startTime) / 1000,
    timestamp: new Date().toISOString(),
  })
}
