// Single problem endpoint
import { type NextRequest, NextResponse } from "next/server"
import { getProblemById } from "@/lib/math-engine"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const problem = getProblemById(id)

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  return NextResponse.json(problem)
}
