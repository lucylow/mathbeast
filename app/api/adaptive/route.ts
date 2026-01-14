// Adaptive difficulty assessment API
import { NextResponse } from "next/server"
import { assessAdaptiveDifficulty } from "@/lib/math-engine"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    if (!body.recentPerformance || !Array.isArray(body.recentPerformance)) {
      return NextResponse.json({ error: "recentPerformance array is required" }, { status: 400 })
    }

    const assessment = await assessAdaptiveDifficulty(body.userId, body.recentPerformance)

    return NextResponse.json({ assessment })
  } catch (error) {
    console.error("Adaptive assessment error:", error)
    return NextResponse.json({ error: "Failed to assess difficulty" }, { status: 500 })
  }
}
