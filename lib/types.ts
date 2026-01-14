// Types and schemas for MathBeast API

export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert"
export type Topic =
  | "algebra"
  | "calculus"
  | "geometry"
  | "statistics"
  | "trigonometry"
  | "number_theory"
  | "combinatorics"
  | "linear_algebra"
  | "differential_equations"
  | "probability"
export type ReasoningLevel = "low" | "medium" | "high"

export interface MathProblem {
  id: string
  rawContent: string
  source: string
  difficulty: Difficulty
  topic: Topic
  subtopics: string[]
  tags: string[]
  estimatedTime: number
  requiresCalculator: boolean
  requiresDrawing: boolean
  structuredFormat: Record<string, unknown>
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface SolutionStep {
  stepNumber: number
  description: string
  explanation: string
  equation?: string
}

export interface MathSolution {
  id: string
  problemId: string
  steps: SolutionStep[]
  finalAnswer: string
  explanation: string
  alternativeMethods: Record<string, unknown>[]
  commonMistakes: string[]
  verification: Record<string, unknown>
  confidenceScore: number
  generatedBy: string
  generatedAt: string
}

export interface SearchFilters {
  query?: string
  topic?: Topic
  difficulty?: Difficulty
  source?: string
  limit?: number
  offset?: number
}

export interface AggregationStats {
  totalProblems: number
  bySource: Record<string, number>
  byTopic: Record<string, number>
  byDifficulty: Record<string, number>
  lastUpdate: Record<string, string>
}

export interface SystemMetrics {
  activeConnections: number
  cacheHits: number
  cacheMisses: number
  problemsProcessed: number
  solutionsGenerated: number
  uptimeSeconds: number
}

export interface DataSource {
  id: string
  name: string
  url: string
  type: "api" | "scrape" | "feed"
  status: "active" | "inactive" | "error"
  problemCount: number
  lastSync: string
  enabled: boolean
}

export interface FineTuningConfig {
  loraRank: number
  loraAlpha: number
  loraDropout: number
  targetModules: string[]
  learningRate: number
  epochs: number
}

export interface BatchProcessingJob {
  id: string
  status: "pending" | "processing" | "completed" | "failed"
  totalProblems: number
  processedProblems: number
  startedAt: string
  completedAt?: string
  results: BatchProcessingResult[]
}

export interface BatchProcessingResult {
  problemId: string
  status: "success" | "error"
  problem?: MathProblem
  error?: string
}

export interface HintRequest {
  problemId: string
  currentStep: number
  userAnswer?: string
  hintLevel: 1 | 2 | 3
}

export interface Hint {
  id: string
  problemId: string
  stepNumber: number
  hintLevel: 1 | 2 | 3
  content: string
  isReveal: boolean
}

export interface AdaptiveDifficultyAssessment {
  recommendedDifficulty: Difficulty
  userPerformance: {
    correctRate: number
    avgSolveTime: number
    streakLength: number
  }
  nextProblemSuggestions: string[]
}

export interface ProblemClassification {
  mainTopic: Topic
  subtopics: string[]
  difficultyLevel: Difficulty
  estimatedSolveTime: number
  tags: string[]
  requiresCalculator: boolean
  requiresDrawing: boolean
  problemType: "multiple_choice" | "free_response" | "proof" | "application"
  keyConcepts: string[]
  prerequisiteTopics: string[]
  competitionLevel?: "AMC" | "AIME" | "USAMO" | "IMO" | "none"
}

export interface ChainOfThoughtStep {
  thought: string
  action: string
  observation: string
  confidence: number
}

export interface EnhancedSolution extends MathSolution {
  chainOfThought: ChainOfThoughtStep[]
  hints: Hint[]
  relatedProblems: string[]
  difficultyAnalysis: {
    conceptualDifficulty: number
    computationalDifficulty: number
    timeComplexity: string
  }
}

export interface ModelConfig {
  modelId: string
  reasoningLevel: ReasoningLevel
  temperature: number
  maxTokens: number
  useChainOfThought: boolean
  streamResponse: boolean
}

export interface AggregationJob {
  id: string
  sourceId: string
  status: "pending" | "running" | "completed" | "failed"
  startedAt: string
  completedAt?: string
  problemsFound: number
  problemsProcessed: number
  errors: string[]
}

export interface ProcessingPipelineStage {
  name: string
  status: "pending" | "running" | "completed" | "skipped" | "error"
  duration?: number
  metadata?: Record<string, unknown>
}

export interface PipelineRun {
  id: string
  stages: ProcessingPipelineStage[]
  inputCount: number
  outputCount: number
  startedAt: string
  completedAt?: string
}

// GPT-OSS-120B Model Configuration
export interface GPTOSS120BConfig {
  modelPath: string
  quantization: "mxfp4" | "fp16" | "bf16" | "int8"
  device: "cuda" | "cpu" | "auto"
  maxContextLength: number
  attentionImplementation: "flash_attention_2" | "sdpa" | "eager"
  lowCpuMemUsage: boolean
  trustRemoteCode: boolean
}

// Mixture of Experts Configuration
export interface MoEConfig {
  totalParameters: string
  activeParameters: string
  numExperts: number
  topK: number
  expertCapacity: number
  routerType: "top_k" | "switch" | "expert_choice"
  loadBalancingLoss: boolean
}

// LoRA Fine-tuning Configuration
export interface LoRAConfig {
  taskType: "CAUSAL_LM" | "SEQ_CLS" | "TOKEN_CLS"
  inferenceMode: boolean
  rank: number
  alpha: number
  dropout: number
  targetModules: string[]
  bias: "none" | "all" | "lora_only"
  modulesToSave?: string[]
}

// Training Arguments
export interface TrainingConfig {
  outputDir: string
  numTrainEpochs: number
  perDeviceTrainBatchSize: number
  perDeviceEvalBatchSize: number
  gradientAccumulationSteps: number
  warmupSteps: number
  loggingSteps: number
  saveStrategy: "epoch" | "steps" | "no"
  evaluationStrategy: "epoch" | "steps" | "no"
  learningRate: number
  fp16: boolean
  bf16: boolean
  gradientCheckpointing: boolean
  maxGradNorm: number
  weightDecay: number
  adamBeta1: number
  adamBeta2: number
  adamEpsilon: number
  lrSchedulerType: "linear" | "cosine" | "cosine_with_restarts" | "polynomial" | "constant"
}

// Fine-tuning Dataset Entry
export interface FineTuningDataset {
  name: string
  path: string
  split: string
  size: number
  format: "instruction" | "completion" | "chat"
}

// Fine-tuning Job
export interface FineTuningJob {
  id: string
  status: "pending" | "preparing" | "training" | "evaluating" | "completed" | "failed"
  baseModel: string
  datasets: FineTuningDataset[]
  loraConfig: LoRAConfig
  trainingConfig: TrainingConfig
  metrics: TrainingMetrics
  createdAt: string
  startedAt?: string
  completedAt?: string
  checkpoints: string[]
  error?: string
}

// Training Metrics
export interface TrainingMetrics {
  epoch: number
  step: number
  loss: number
  learningRate: number
  evalLoss?: number
  evalAccuracy?: number
  perplexity?: number
  trainSamplesPerSecond?: number
  evalSamplesPerSecond?: number
  memoryUsed?: number
  gpuUtilization?: number
}

// Performance Benchmark Result
export interface BenchmarkResult {
  benchmark: string
  score: number
  maxScore: number
  percentile?: number
  metrics: Record<string, number>
  timestamp: string
}

// Model Deployment Config
export interface DeploymentConfig {
  gpuType: "H100" | "A100" | "A10G" | "T4"
  gpuCount: number
  quantization: "mxfp4" | "fp16" | "bf16" | "int8"
  maxConcurrentRequests: number
  maxBatchSize: number
  timeout: number
  healthCheckInterval: number
}

// Inference Statistics
export interface InferenceStats {
  requestsTotal: number
  requestsPerSecond: number
  averageLatency: number
  p50Latency: number
  p95Latency: number
  p99Latency: number
  tokensGenerated: number
  tokensPerSecond: number
  activeExperts: number
  cacheHitRate: number
  memoryUsed: number
  gpuUtilization: number
}

// Mathematical Dataset Info
export interface MathDatasetInfo {
  name: string
  source: string
  problemCount: number
  topicDistribution: Record<string, number>
  difficultyDistribution: Record<string, number>
  avgProblemLength: number
  avgSolutionLength: number
  hasChainOfThought: boolean
  competitionLevel?: string
}

// Competition Problem Type
export interface CompetitionProblem {
  id: string
  competition: "AMC" | "AIME" | "USAMO" | "IMO" | "Putnam" | "other"
  year: number
  problemNumber: number
  content: string
  solution: string
  difficulty: number
  topics: string[]
  techniques: string[]
}

// Harmony Response Format (for GPT-OSS-120B)
export interface HarmonyResponse {
  reasoning: string
  answer: string
  confidence: number
  chainOfThought: ChainOfThoughtStep[]
  alternativeApproaches?: string[]
  verificationSteps?: string[]
}

// Expert Routing Info (MoE specific)
export interface ExpertRoutingInfo {
  tokenIndex: number
  selectedExperts: number[]
  routerWeights: number[]
  loadBalancingScore: number
}
