// Fine-tuning API for GPT-OSS-120B
import { type NextRequest, NextResponse } from "next/server"
import { createFineTuningJob, listFineTuningJobs, mathDatasets } from "@/lib/gpt-oss-engine"

export async function GET() {
  const jobs = listFineTuningJobs()
  return NextResponse.json({
    jobs,
    availableDatasets: mathDatasets,
    defaultConfig: {
      lora: {
        rank: 16,
        alpha: 32,
        dropout: 0.1,
        targetModules: ["q_proj", "v_proj", "k_proj", "o_proj"],
      },
      training: {
        epochs: 3,
        batchSize: 2,
        learningRate: 2e-4,
        gradientAccumulation: 8,
      },
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { datasets, loraConfig, trainingConfig } = body

    if (!datasets || !Array.isArray(datasets) || datasets.length === 0) {
      return NextResponse.json({ error: "At least one dataset is required" }, { status: 400 })
    }

    const job = createFineTuningJob(datasets, loraConfig, trainingConfig)

    return NextResponse.json({
      message: "Fine-tuning job created",
      job,
    })
  } catch (error) {
    console.error("Fine-tuning error:", error)
    return NextResponse.json({ error: "Failed to create fine-tuning job" }, { status: 500 })
  }
}
