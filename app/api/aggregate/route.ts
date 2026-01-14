// Aggregation API endpoint
import { type NextRequest, NextResponse } from "next/server"
import { aggregateAllSources, aggregateFromSource, getAggregationStats } from "@/lib/aggregator"

export async function GET() {
  const stats = getAggregationStats()
  return NextResponse.json(stats)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { sourceId } = body

    if (sourceId) {
      // Aggregate from specific source
      const result = await aggregateFromSource(sourceId)
      return NextResponse.json({
        status: "completed",
        source: sourceId,
        ...result,
        timestamp: new Date().toISOString(),
      })
    }

    // Aggregate from all sources
    const result = await aggregateAllSources()
    return NextResponse.json({
      status: "completed",
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error triggering aggregation:", error)
    return NextResponse.json({ error: "Failed to trigger aggregation" }, { status: 500 })
  }
}
