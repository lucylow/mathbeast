// Health check endpoint
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      ai_engine: true,
      aggregator: true,
      database: true,
    },
    version: "1.0.0",
  })
}
