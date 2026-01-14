// Problem classification API
import { NextResponse } from "next/server"
import { classifyProblem } from "@/lib/math-engine"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.content) {
      return NextResponse.json({ error: "content is required" }, { status: 400 })
    }

    const classification = await classifyProblem(body.content, body.source || "api")

    return NextResponse.json({ classification })
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "Failed to classify problem" }, { status: 500 })
  }
}
