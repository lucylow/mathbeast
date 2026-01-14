// Batch processing endpoint
import { type NextRequest, NextResponse } from "next/server"
import { structureProblem } from "@/lib/math-engine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rawProblems } = body

    if (!rawProblems || !Array.isArray(rawProblems)) {
      return NextResponse.json({ error: "rawProblems array is required" }, { status: 400 })
    }

    const startTime = Date.now()
    const results = []
    let processed = 0
    let failed = 0

    for (const item of rawProblems) {
      try {
        const problem = await structureProblem(item.content, item.source || "batch")
        results.push(problem)
        processed++
      } catch (error) {
        console.error("Failed to process item:", error)
        failed++
      }
    }

    const durationSeconds = (Date.now() - startTime) / 1000

    return NextResponse.json({
      processed,
      failed,
      results: results.slice(0, 10), // Limit response
      durationSeconds,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in batch processing:", error)
    return NextResponse.json({ error: "Failed to process batch" }, { status: 500 })
  }
}
