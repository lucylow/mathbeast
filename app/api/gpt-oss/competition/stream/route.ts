// Streaming competition solution API
import type { NextRequest } from "next/server"
import { streamCompetitionSolution } from "@/lib/gpt-oss-engine"
import type { CompetitionProblem } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { problem } = body as { problem: CompetitionProblem }

    if (!problem || !problem.content) {
      return new Response(JSON.stringify({ error: "Problem content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const fullProblem: CompetitionProblem = {
      id: problem.id || `comp_${Date.now()}`,
      competition: problem.competition || "other",
      year: problem.year || new Date().getFullYear(),
      problemNumber: problem.problemNumber || 1,
      content: problem.content,
      solution: "",
      difficulty: problem.difficulty || 5,
      topics: problem.topics || [],
      techniques: problem.techniques || [],
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamCompetitionSolution(fullProblem)) {
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Streaming error:", error)
    return new Response(JSON.stringify({ error: "Failed to stream solution" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
