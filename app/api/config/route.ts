// Model configuration API
import { NextResponse } from "next/server"
import { getModelConfig, getEngineStats } from "@/lib/math-engine"

export async function GET() {
  const config = getModelConfig()
  const stats = getEngineStats()

  return NextResponse.json({
    model: {
      ...config,
      description: "GPT-OSS-120B inspired configuration for mathematical reasoning",
      features: [
        "Chain-of-thought reasoning",
        "Configurable reasoning levels (low/medium/high)",
        "Competition math classification (AMC/AIME/USAMO/IMO)",
        "Adaptive difficulty assessment",
        "Batch processing support",
        "Streaming solution generation",
      ],
    },
    stats,
    capabilities: {
      maxBatchSize: 100,
      supportedTopics: [
        "algebra",
        "calculus",
        "geometry",
        "statistics",
        "trigonometry",
        "number_theory",
        "combinatorics",
        "linear_algebra",
        "differential_equations",
        "probability",
      ],
      reasoningLevels: ["low", "medium", "high"],
      hintLevels: [1, 2, 3],
    },
  })
}
