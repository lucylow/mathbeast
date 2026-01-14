// Fine-tuning job status API
import { type NextRequest, NextResponse } from "next/server"
import { getFineTuningJob } from "@/lib/gpt-oss-engine"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = getFineTuningJob(id)

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  return NextResponse.json(job)
}
