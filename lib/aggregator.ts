// Data aggregation engine for math resources
import type { DataSource, MathProblem, AggregationStats } from "./types"
import { structureProblem } from "./math-engine"

// Simulated data sources
export const dataSources: DataSource[] = [
  {
    id: "khan_academy",
    name: "Khan Academy",
    url: "https://www.khanacademy.org",
    type: "api",
    status: "active",
    problemCount: 15420,
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    enabled: true,
  },
  {
    id: "aops",
    name: "Art of Problem Solving",
    url: "https://artofproblemsolving.com",
    type: "scrape",
    status: "active",
    problemCount: 8750,
    lastSync: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    enabled: true,
  },
  {
    id: "mit_ocw",
    name: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu",
    type: "scrape",
    status: "active",
    problemCount: 4200,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    enabled: true,
  },
  {
    id: "project_euler",
    name: "Project Euler",
    url: "https://projecteuler.net",
    type: "scrape",
    status: "active",
    problemCount: 850,
    lastSync: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    enabled: true,
  },
  {
    id: "brilliant",
    name: "Brilliant.org",
    url: "https://brilliant.org",
    type: "scrape",
    status: "active",
    problemCount: 6300,
    lastSync: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    enabled: true,
  },
  {
    id: "arxiv",
    name: "arXiv Math",
    url: "https://arxiv.org/list/math/recent",
    type: "feed",
    status: "active",
    problemCount: 2100,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    enabled: true,
  },
  {
    id: "stackexchange",
    name: "Math Stack Exchange",
    url: "https://math.stackexchange.com",
    type: "api",
    status: "active",
    problemCount: 12800,
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    enabled: true,
  },
  {
    id: "openstax",
    name: "OpenStax",
    url: "https://openstax.org",
    type: "scrape",
    status: "active",
    problemCount: 3500,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    enabled: true,
  },
]

// In-memory problem store
const problemStore: MathProblem[] = []

// Sample problems for demo
const sampleProblems = [
  {
    content: "Solve the quadratic equation: x² - 5x + 6 = 0",
    source: "khan_academy",
  },
  {
    content: "Find the derivative of f(x) = 3x³ - 2x² + 5x - 7",
    source: "mit_ocw",
  },
  {
    content: "A triangle has sides of length 5, 12, and 13. Find the area of the triangle.",
    source: "brilliant",
  },
  {
    content: "If you roll two fair six-sided dice, what is the probability that the sum is 7?",
    source: "aops",
  },
  {
    content: "Find the sum of the first 100 positive integers using Gauss's method.",
    source: "project_euler",
  },
  {
    content: "Evaluate the integral: ∫(2x + 3)dx from 0 to 5",
    source: "mit_ocw",
  },
  {
    content: "Prove that √2 is irrational using proof by contradiction.",
    source: "arxiv",
  },
  {
    content: "How many ways can you arrange the letters in the word 'MATHEMATICS'?",
    source: "stackexchange",
  },
]

export async function aggregateFromSource(sourceId: string): Promise<{
  count: number
  problems: MathProblem[]
  status: string
}> {
  const source = dataSources.find((s) => s.id === sourceId)
  if (!source) {
    return { count: 0, problems: [], status: "error" }
  }

  // Simulate fetching problems from source
  const sourceProblems = sampleProblems.filter((p) => p.source === sourceId)

  const processedProblems: MathProblem[] = []
  for (const raw of sourceProblems) {
    try {
      const problem = await structureProblem(raw.content, raw.source)
      processedProblems.push(problem)
      problemStore.push(problem)
    } catch (error) {
      console.error(`Error processing problem from ${sourceId}:`, error)
    }
  }

  // Update source stats
  source.lastSync = new Date().toISOString()
  source.problemCount += processedProblems.length

  return {
    count: processedProblems.length,
    problems: processedProblems,
    status: "success",
  }
}

export async function aggregateAllSources(): Promise<{
  results: Record<string, { count: number; status: string }>
  stats: AggregationStats
}> {
  const results: Record<string, { count: number; status: string }> = {}

  for (const source of dataSources) {
    if (!source.enabled) continue

    try {
      const result = await aggregateFromSource(source.id)
      results[source.id] = { count: result.count, status: result.status }
    } catch (error) {
      results[source.id] = { count: 0, status: "error" }
    }
  }

  return {
    results,
    stats: getAggregationStats(),
  }
}

export function getAggregationStats(): AggregationStats {
  const bySource: Record<string, number> = {}
  const byTopic: Record<string, number> = {}
  const byDifficulty: Record<string, number> = {}
  const lastUpdate: Record<string, string> = {}

  for (const source of dataSources) {
    bySource[source.name] = source.problemCount
    lastUpdate[source.id] = source.lastSync
  }

  for (const problem of problemStore) {
    byTopic[problem.topic] = (byTopic[problem.topic] || 0) + 1
    byDifficulty[problem.difficulty] = (byDifficulty[problem.difficulty] || 0) + 1
  }

  // Add default topic/difficulty counts for demo
  if (Object.keys(byTopic).length === 0) {
    byTopic["algebra"] = 12500
    byTopic["calculus"] = 8200
    byTopic["geometry"] = 6800
    byTopic["statistics"] = 5400
    byTopic["number_theory"] = 3200
  }

  if (Object.keys(byDifficulty).length === 0) {
    byDifficulty["beginner"] = 15000
    byDifficulty["intermediate"] = 22000
    byDifficulty["advanced"] = 12000
    byDifficulty["expert"] = 4920
  }

  return {
    totalProblems: dataSources.reduce((sum, s) => sum + s.problemCount, 0),
    bySource,
    byTopic,
    byDifficulty,
    lastUpdate,
  }
}

export function searchProblems(filters: {
  query?: string
  topic?: string
  difficulty?: string
  source?: string
  limit?: number
  offset?: number
}): { problems: MathProblem[]; total: number } {
  let results = [...problemStore]

  if (filters.topic) {
    results = results.filter((p) => p.topic === filters.topic)
  }

  if (filters.difficulty) {
    results = results.filter((p) => p.difficulty === filters.difficulty)
  }

  if (filters.source) {
    results = results.filter((p) => p.source === filters.source)
  }

  if (filters.query) {
    const query = filters.query.toLowerCase()
    results = results.filter(
      (p) => p.rawContent.toLowerCase().includes(query) || p.tags.some((t) => t.toLowerCase().includes(query)),
    )
  }

  const total = results.length
  const offset = filters.offset || 0
  const limit = filters.limit || 50

  return {
    problems: results.slice(offset, offset + limit),
    total,
  }
}

export function getDataSources(): DataSource[] {
  return dataSources
}

export function toggleSource(sourceId: string, enabled: boolean): DataSource | null {
  const source = dataSources.find((s) => s.id === sourceId)
  if (source) {
    source.enabled = enabled
    return source
  }
  return null
}
