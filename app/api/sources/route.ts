// Data sources API endpoint
import { type NextRequest, NextResponse } from "next/server"
import { getDataSources, toggleSource } from "@/lib/aggregator"

export async function GET() {
  const sources = getDataSources()
  return NextResponse.json({ sources })
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { sourceId, enabled } = body

    if (!sourceId || typeof enabled !== "boolean") {
      return NextResponse.json({ error: "sourceId and enabled (boolean) are required" }, { status: 400 })
    }

    const source = toggleSource(sourceId, enabled)
    if (!source) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 })
    }

    return NextResponse.json(source)
  } catch (error) {
    console.error("Error updating source:", error)
    return NextResponse.json({ error: "Failed to update source" }, { status: 500 })
  }
}
