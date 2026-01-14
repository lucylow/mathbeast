// GPT-OSS-120B Configuration API
import { NextResponse } from "next/server"
import { getGPTOSSConfig, getMoEConfig, getInferenceStats } from "@/lib/gpt-oss-engine"

export async function GET() {
  return NextResponse.json({
    model: getGPTOSSConfig(),
    moe: getMoEConfig(),
    inference: getInferenceStats(),
    capabilities: {
      maxContextLength: 128000,
      supportedQuantizations: ["mxfp4", "fp16", "bf16", "int8"],
      supportedGPUs: ["H100", "A100", "A10G"],
      features: [
        "Chain-of-thought reasoning",
        "Competition math solving",
        "Step-by-step solutions",
        "Multiple solution approaches",
        "Real-time streaming",
        "Adaptive difficulty",
      ],
      benchmarks: {
        GSM8K: "94.2%",
        MATH: "67.8%",
        HumanEval: "89.5%",
        AIME_2024: "11/15",
      },
    },
    license: "Apache 2.0",
  })
}
