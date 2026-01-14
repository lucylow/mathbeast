// Batch processing API for multiple problems
import { NextResponse } from "next/server"
import { createBatchJob, getBatchJob } from "@/lib/math-engine"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.problems || !Array.isArray(body.problems)) {
      return NextResponse.json({ error: "problems array is required" }, { status: 400 })
    }

    if (body.problems.length > 100) {
      return NextResponse.json({ error: "Maximum 100 problems per batch" }, { status: 400 })
    }

    const job = await createBatchJob(body.problems)

    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      totalProblems: job.totalProblems,
      message: "Batch job created. Poll GET /api/batch?jobId=<id> for status.",
    })
  } catch (error) {
    console.error("Batch processing error:", error)
    return NextResponse.json({ error: "Failed to create batch job" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")

  if (!jobId) {
    return NextResponse.json({ error: "jobId is required" }, { status: 400 })
  }

  const job = getBatchJob(jobId)

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  return NextResponse.json({ job })
}
