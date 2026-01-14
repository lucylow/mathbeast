// Benchmark API for GPT-OSS-120B
import { type NextRequest, NextResponse } from "next/server"
import { runBenchmark } from "@/lib/gpt-oss-engine"

const availableBenchmarks = [
  { id: "GSM8K", name: "GSM8K", description: "Grade school math problems", maxScore: 100 },
  { id: "MATH", name: "MATH Dataset", description: "Competition-level math", maxScore: 100 },
  { id: "AIME_2024", name: "AIME 2024", description: "American Invitational Math Exam", maxScore: 15 },
  { id: "AMC_12", name: "AMC 12", description: "AMC 12 Competition", maxScore: 150 },
  { id: "HumanEval", name: "HumanEval", description: "Code generation benchmark", maxScore: 100 },
  { id: "MBPP", name: "MBPP", description: "Python programming problems", maxScore: 100 },
]

export async function GET() {
  return NextResponse.json({
    availableBenchmarks,
    modelInfo: {
      name: "GPT-OSS-120B",
      architecture: "Mixture-of-Experts",
      totalParams: "117B",
      activeParams: "5.1B",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { benchmark } = body

    if (!benchmark) {
      return NextResponse.json({ error: "Benchmark name is required" }, { status: 400 })
    }

    const result = await runBenchmark(benchmark)

    return NextResponse.json({
      message: "Benchmark completed",
      result,
    })
  } catch (error) {
    console.error("Benchmark error:", error)
    return NextResponse.json({ error: "Failed to run benchmark" }, { status: 500 })
  }
}
