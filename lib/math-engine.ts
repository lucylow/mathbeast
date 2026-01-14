// AI-powered math problem processing engine using GPT-OSS-120B concepts
import { generateText, streamText } from "ai"
import crypto from "crypto"
import type {
  MathProblem,
  MathSolution,
  Difficulty,
  Topic,
  ReasoningLevel,
  Hint,
  HintRequest,
  ProblemClassification,
  AdaptiveDifficultyAssessment,
  BatchProcessingJob,
  ModelConfig,
} from "./types"

// In-memory cache for demo purposes
const problemCache = new Map<string, MathProblem>()
const solutionCache = new Map<string, MathSolution>()
const hintCache = new Map<string, Hint[]>()
const batchJobs = new Map<string, BatchProcessingJob>()

// Statistics tracking
export const engineStats = {
  problemsProcessed: 0,
  solutionsGenerated: 0,
  hintsGenerated: 0,
  cacheHits: 0,
  cacheMisses: 0,
  batchJobsCompleted: 0,
  averageProcessingTime: 0,
  totalProcessingTime: 0,
}

const reasoningTemplates: Record<ReasoningLevel, string> = {
  low: `Provide a concise solution with minimal explanation. Focus on the final answer.`,
  medium: `Provide a step-by-step solution with clear explanations. 
Show your work at each step and explain the reasoning behind each transformation.`,
  high: `Provide a detailed solution with full chain-of-thought reasoning.
Include:
- Initial problem analysis and strategy selection
- Step-by-step solution with explanations
- Alternative approaches when applicable
- Common mistakes to avoid
- Verification of the answer
- Related concepts and extensions`,
}

const competitionLevels = {
  AMC: { minDifficulty: "intermediate", topics: ["algebra", "geometry", "number_theory", "combinatorics"] },
  AIME: { minDifficulty: "advanced", topics: ["algebra", "geometry", "number_theory", "combinatorics"] },
  USAMO: { minDifficulty: "expert", topics: ["number_theory", "combinatorics", "geometry"] },
  IMO: { minDifficulty: "expert", topics: ["number_theory", "combinatorics", "geometry", "algebra"] },
}

const classificationSchema = {
  topics: [
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
  ] as Topic[],
  difficulties: ["beginner", "intermediate", "advanced", "expert"] as Difficulty[],
}

const defaultModelConfig: ModelConfig = {
  modelId: "anthropic/claude-sonnet-4-20250514",
  reasoningLevel: "medium",
  temperature: 0.2,
  maxTokens: 2000,
  useChainOfThought: true,
  streamResponse: false,
}

function generateId(content: string): string {
  return crypto.createHash("md5").update(content).digest("hex").slice(0, 12)
}

export async function classifyProblem(rawContent: string, source: string): Promise<ProblemClassification> {
  const prompt = `
Analyze the following math problem and classify it comprehensively.

Source: ${source}
Problem: ${rawContent}

Provide a JSON response with:
{
  "mainTopic": "one of: algebra, calculus, geometry, statistics, trigonometry, number_theory, combinatorics, linear_algebra, differential_equations, probability",
  "subtopics": ["list of specific subtopics"],
  "difficultyLevel": "one of: beginner, intermediate, advanced, expert",
  "estimatedSolveTime": number in minutes,
  "tags": ["relevant keywords"],
  "requiresCalculator": boolean,
  "requiresDrawing": boolean,
  "problemType": "one of: multiple_choice, free_response, proof, application",
  "keyConcepts": ["mathematical concepts needed"],
  "prerequisiteTopics": ["topics student should know first"],
  "competitionLevel": "one of: AMC, AIME, USAMO, IMO, none"
}

Respond with ONLY valid JSON.`

  try {
    const { text } = await generateText({
      model: defaultModelConfig.modelId,
      prompt,
      temperature: 0.1,
    })

    return extractJson(text) as ProblemClassification
  } catch (error) {
    console.error("Classification error:", error)
    return {
      mainTopic: "algebra",
      subtopics: [],
      difficultyLevel: "intermediate",
      estimatedSolveTime: 5,
      tags: [],
      requiresCalculator: false,
      requiresDrawing: false,
      problemType: "free_response",
      keyConcepts: [],
      prerequisiteTopics: [],
      competitionLevel: "none",
    }
  }
}

export async function structureProblem(rawContent: string, source: string): Promise<MathProblem> {
  const startTime = Date.now()
  const cacheKey = `structure:${generateId(rawContent)}`

  if (problemCache.has(cacheKey)) {
    engineStats.cacheHits++
    return problemCache.get(cacheKey)!
  }

  engineStats.cacheMisses++
  engineStats.problemsProcessed++

  const classification = await classifyProblem(rawContent, source)
  const problemId = generateId(rawContent)

  const problem: MathProblem = {
    id: problemId,
    rawContent,
    source,
    difficulty: classification.difficultyLevel,
    topic: classification.mainTopic,
    subtopics: classification.subtopics,
    tags: classification.tags,
    estimatedTime: classification.estimatedSolveTime,
    requiresCalculator: classification.requiresCalculator,
    requiresDrawing: classification.requiresDrawing,
    structuredFormat: classification,
    metadata: {
      source,
      processedAt: new Date().toISOString(),
      modelUsed: defaultModelConfig.modelId,
      competitionLevel: classification.competitionLevel,
      keyConcepts: classification.keyConcepts,
      prerequisiteTopics: classification.prerequisiteTopics,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  problemCache.set(cacheKey, problem)

  // Update stats
  const processingTime = Date.now() - startTime
  engineStats.totalProcessingTime += processingTime
  engineStats.averageProcessingTime = engineStats.totalProcessingTime / engineStats.problemsProcessed

  return problem
}

export async function generateSolution(
  problem: MathProblem,
  reasoningLevel: ReasoningLevel = "medium",
  includeAlternatives = true,
): Promise<MathSolution> {
  const cacheKey = `solution:${problem.id}:${reasoningLevel}:${includeAlternatives}`

  if (solutionCache.has(cacheKey)) {
    engineStats.cacheHits++
    return solutionCache.get(cacheKey)!
  }

  engineStats.cacheMisses++
  engineStats.solutionsGenerated++

  const systemPrompt = `
You are an expert mathematics tutor specializing in ${problem.topic}.
${reasoningTemplates[reasoningLevel]}

Problem Context:
- Difficulty: ${problem.difficulty}
- Topics: ${problem.subtopics.join(", ")}
- Key Concepts: ${(problem.metadata.keyConcepts as string[])?.join(", ") || "N/A"}

Generate a solution with the following JSON structure:
{
  "steps": [
    {"stepNumber": 1, "description": "What we're doing", "explanation": "Why we're doing it", "equation": "Mathematical expression"}
  ],
  "finalAnswer": "The final answer",
  "explanation": "Overall explanation of the solution approach",
  "alternativeMethods": [{"name": "Method name", "description": "Brief description of alternative approach"}],
  "commonMistakes": ["List of common mistakes students make"],
  "verification": {"method": "How to verify", "result": "Verification result"},
  "chainOfThought": [
    {"thought": "Initial analysis", "action": "What to do", "observation": "Result", "confidence": 0.9}
  ]
}

${includeAlternatives ? "Include alternative methods and common mistakes." : "Focus only on the main solution."}

Respond with ONLY valid JSON.`

  try {
    const { text } = await generateText({
      model: defaultModelConfig.modelId,
      system: systemPrompt,
      prompt: problem.rawContent,
      temperature: 0.2,
    })

    const solutionData = extractJson(text)
    const solutionId = generateId(`${problem.id}:${Date.now()}`)

    const solution: MathSolution = {
      id: solutionId,
      problemId: problem.id,
      steps: solutionData.steps || [],
      finalAnswer: solutionData.finalAnswer || "",
      explanation: solutionData.explanation || "",
      alternativeMethods: solutionData.alternativeMethods || [],
      commonMistakes: solutionData.commonMistakes || [],
      verification: solutionData.verification || {},
      confidenceScore: calculateConfidence(solutionData),
      generatedBy: `${defaultModelConfig.modelId} (${reasoningLevel} reasoning)`,
      generatedAt: new Date().toISOString(),
    }

    solutionCache.set(cacheKey, solution)
    return solution
  } catch (error) {
    console.error("Error generating solution:", error)
    throw error
  }
}

export async function generateHint(request: HintRequest): Promise<Hint> {
  engineStats.hintsGenerated++

  const problem = getProblemById(request.problemId)
  if (!problem) {
    throw new Error("Problem not found")
  }

  const hintPrompts: Record<1 | 2 | 3, string> = {
    1: `Give a subtle hint that points the student in the right direction without revealing the method. Just nudge them toward the correct approach.`,
    2: `Give a more specific hint that identifies the key concept or technique needed, but don't solve any steps.`,
    3: `Give a detailed hint that explains the first step or two of the solution approach, helping the student get started.`,
  }

  const prompt = `
Problem: ${problem.rawContent}
Current step the student is on: ${request.currentStep}
${request.userAnswer ? `Student's current answer attempt: ${request.userAnswer}` : ""}

${hintPrompts[request.hintLevel]}

Provide ONLY the hint text, no JSON or extra formatting.`

  try {
    const { text } = await generateText({
      model: defaultModelConfig.modelId,
      prompt,
      temperature: 0.3,
    })

    const hint: Hint = {
      id: generateId(`hint:${request.problemId}:${request.currentStep}:${request.hintLevel}:${Date.now()}`),
      problemId: request.problemId,
      stepNumber: request.currentStep,
      hintLevel: request.hintLevel,
      content: text.trim(),
      isReveal: request.hintLevel === 3,
    }

    // Cache hints
    const cacheKey = `hints:${request.problemId}`
    const existingHints = hintCache.get(cacheKey) || []
    existingHints.push(hint)
    hintCache.set(cacheKey, existingHints)

    return hint
  } catch (error) {
    console.error("Error generating hint:", error)
    throw error
  }
}

export async function assessAdaptiveDifficulty(
  userId: string,
  recentPerformance: { problemId: string; correct: boolean; timeSpent: number }[],
): Promise<AdaptiveDifficultyAssessment> {
  const correctCount = recentPerformance.filter((p) => p.correct).length
  const correctRate = recentPerformance.length > 0 ? correctCount / recentPerformance.length : 0.5
  const avgSolveTime =
    recentPerformance.length > 0
      ? recentPerformance.reduce((sum, p) => sum + p.timeSpent, 0) / recentPerformance.length
      : 300

  // Calculate streak
  let streakLength = 0
  for (let i = recentPerformance.length - 1; i >= 0; i--) {
    if (recentPerformance[i].correct) {
      streakLength++
    } else {
      break
    }
  }

  // Determine recommended difficulty
  let recommendedDifficulty: Difficulty = "intermediate"
  if (correctRate >= 0.85 && streakLength >= 5) {
    recommendedDifficulty = "advanced"
  } else if (correctRate >= 0.95 && streakLength >= 10) {
    recommendedDifficulty = "expert"
  } else if (correctRate < 0.5) {
    recommendedDifficulty = "beginner"
  }

  // Get problem suggestions based on topics from recent problems
  const recentTopics = new Set<string>()
  for (const perf of recentPerformance) {
    const problem = getProblemById(perf.problemId)
    if (problem) {
      recentTopics.add(problem.topic)
    }
  }

  return {
    recommendedDifficulty,
    userPerformance: {
      correctRate,
      avgSolveTime,
      streakLength,
    },
    nextProblemSuggestions: Array.from(recentTopics).slice(0, 3),
  }
}

export async function createBatchJob(problems: { content: string; source: string }[]): Promise<BatchProcessingJob> {
  const jobId = generateId(`batch:${Date.now()}`)

  const job: BatchProcessingJob = {
    id: jobId,
    status: "pending",
    totalProblems: problems.length,
    processedProblems: 0,
    startedAt: new Date().toISOString(),
    results: [],
  }

  batchJobs.set(jobId, job)

  // Process in background
  processBatchJob(jobId, problems)

  return job
}

async function processBatchJob(jobId: string, problems: { content: string; source: string }[]): Promise<void> {
  const job = batchJobs.get(jobId)
  if (!job) return

  job.status = "processing"

  for (const rawProblem of problems) {
    try {
      const problem = await structureProblem(rawProblem.content, rawProblem.source)
      job.results.push({
        problemId: problem.id,
        status: "success",
        problem,
      })
    } catch (error) {
      job.results.push({
        problemId: generateId(rawProblem.content),
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
    job.processedProblems++
  }

  job.status = "completed"
  job.completedAt = new Date().toISOString()
  engineStats.batchJobsCompleted++
}

export function getBatchJob(jobId: string): BatchProcessingJob | undefined {
  return batchJobs.get(jobId)
}

export async function* streamSolution(
  problem: MathProblem,
  reasoningLevel: ReasoningLevel = "medium",
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = `
You are an expert mathematics tutor. ${reasoningTemplates[reasoningLevel]}
Solve the following problem step by step, explaining each step clearly.`

  const { textStream } = streamText({
    model: defaultModelConfig.modelId,
    system: systemPrompt,
    prompt: problem.rawContent,
    temperature: 0.2,
  })

  for await (const chunk of textStream) {
    yield chunk
  }
}

function extractJson(text: string): Record<string, unknown> {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return JSON.parse(text)
  } catch {
    return parseUnstructured(text)
  }
}

function parseUnstructured(text: string): Record<string, unknown> {
  const result: Record<string, unknown> = {
    mainTopic: "algebra",
    subtopics: [],
    difficultyLevel: "intermediate",
    estimatedSolveTime: 5,
    tags: [],
    requiresCalculator: false,
    requiresDrawing: false,
    problemType: "free_response",
    keyConcepts: [],
    prerequisiteTopics: [],
  }

  const textLower = text.toLowerCase()

  if (textLower.includes("calculus") || textLower.includes("derivative") || textLower.includes("integral")) {
    result.mainTopic = "calculus"
  } else if (textLower.includes("geometry") || textLower.includes("triangle") || textLower.includes("circle")) {
    result.mainTopic = "geometry"
  } else if (textLower.includes("probability") || textLower.includes("statistics")) {
    result.mainTopic = "statistics"
  } else if (textLower.includes("proof") || textLower.includes("prime") || textLower.includes("divisible")) {
    result.mainTopic = "number_theory"
  }

  return result
}

function calculateConfidence(solutionData: Record<string, unknown>): number {
  let score = 0
  if (solutionData.steps && Array.isArray(solutionData.steps) && solutionData.steps.length > 0) score += 0.3
  if (solutionData.finalAnswer) score += 0.3
  if (solutionData.explanation) score += 0.2
  if (solutionData.verification) score += 0.1
  if (solutionData.chainOfThought) score += 0.1
  return Math.min(score, 1.0)
}

export function getEngineStats() {
  return { ...engineStats }
}

export function getAllProblems(): MathProblem[] {
  return Array.from(problemCache.values())
}

export function getProblemById(id: string): MathProblem | undefined {
  for (const problem of problemCache.values()) {
    if (problem.id === id) return problem
  }
  return undefined
}

export function getHintsForProblem(problemId: string): Hint[] {
  return hintCache.get(`hints:${problemId}`) || []
}

export function getModelConfig(): ModelConfig {
  return { ...defaultModelConfig }
}
