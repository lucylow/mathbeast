"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, Play, CheckCircle2, Clock, Layers, Settings2, Trophy, BookOpen, GitBranch } from "lucide-react"

interface BenchmarkResult {
  name: string
  score: number
  maxScore: number
  status: "pending" | "running" | "complete"
}

interface FineTuningMetrics {
  epoch: number
  loss: number
  accuracy: number
  progress: number
}

export function GPTOSSSection() {
  const [benchmarks, setBenchmarks] = useState<BenchmarkResult[]>([
    { name: "GSM8K", score: 94.2, maxScore: 100, status: "complete" },
    { name: "MATH", score: 67.8, maxScore: 100, status: "complete" },
    { name: "AIME 2024", score: 11, maxScore: 15, status: "complete" },
    { name: "AMC 12", score: 132, maxScore: 150, status: "complete" },
  ])

  const [fineTuning, setFineTuning] = useState<FineTuningMetrics | null>(null)
  const [isTraining, setIsTraining] = useState(false)

  const startFineTuning = () => {
    setIsTraining(true)
    setFineTuning({ epoch: 1, loss: 2.5, accuracy: 0.6, progress: 0 })

    // Simulate training progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      if (progress >= 100) {
        clearInterval(interval)
        setIsTraining(false)
        setFineTuning({ epoch: 3, loss: 0.35, accuracy: 0.94, progress: 100 })
      } else {
        setFineTuning({
          epoch: Math.ceil(progress / 33),
          loss: Math.max(0.35, 2.5 - progress * 0.02),
          accuracy: Math.min(0.94, 0.6 + progress * 0.0034),
          progress,
        })
      }
    }, 100)
  }

  const moeStats = {
    totalParams: "117B",
    activeParams: "5.1B",
    experts: 256,
    topK: 8,
    contextWindow: "128K",
    quantization: "MXFP4",
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
            Powered by GPT-OSS-120B
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">Open-Weight Mixture-of-Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging OpenAI&apos;s open-source 117B parameter model with only 5.1B active per pass, enabling
            sophisticated mathematical reasoning on a single H100 GPU.
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* MoE Architecture Card */}
          <Card className="lg:col-span-2 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-500" />
                Mixture-of-Experts Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-500">{moeStats.totalParams}</div>
                  <div className="text-sm text-muted-foreground">Total Parameters</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-500">{moeStats.activeParams}</div>
                  <div className="text-sm text-muted-foreground">Active Per Pass</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-cyan-500">{moeStats.experts}</div>
                  <div className="text-sm text-muted-foreground">Expert Networks</div>
                </div>
              </div>

              {/* Expert Routing Visualization */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Expert Routing (Top-{moeStats.topK})</span>
                  <Badge variant="outline">Live</Badge>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded ${i < 8 ? "bg-emerald-500" : "bg-muted"} transition-colors`}
                      title={`Expert ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  8 of 256 experts activated for current mathematical reasoning task
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Efficiency Card */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Efficiency Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Context Window</span>
                  <span className="font-mono">{moeStats.contextWindow}</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quantization</span>
                  <Badge variant="secondary">{moeStats.quantization}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Native 4-bit for single H100 deployment</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>GPU Memory</span>
                  <span className="font-mono">~45GB</span>
                </div>
                <Progress value={56} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Inference Speed</span>
                  <span className="font-mono">~85 tok/s</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benchmarks & Fine-tuning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Benchmarks */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Mathematical Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benchmarks.map((benchmark) => (
                  <div key={benchmark.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{benchmark.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {benchmark.score}/{benchmark.maxScore}
                        </span>
                        {benchmark.status === "complete" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      </div>
                    </div>
                    <Progress value={(benchmark.score / benchmark.maxScore) * 100} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Key Achievement:</strong> GPT-OSS-120B achieves 94.2% on GSM8K and solves 11/15 AIME 2024
                  problems, rivaling proprietary models at a fraction of the computational cost.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fine-tuning */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-purple-500" />
                LoRA Fine-Tuning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground">Rank (r)</div>
                    <div className="font-mono font-bold">16</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground">Alpha</div>
                    <div className="font-mono font-bold">32</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground">Target Modules</div>
                    <div className="font-mono text-xs">q, k, v, o proj</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground">Learning Rate</div>
                    <div className="font-mono font-bold">2e-4</div>
                  </div>
                </div>
              </div>

              {fineTuning && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>Epoch {fineTuning.epoch}/3</span>
                  </div>
                  <Progress value={fineTuning.progress} />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Loss:</span>{" "}
                      <span className="font-mono">{fineTuning.loss.toFixed(3)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy:</span>{" "}
                      <span className="font-mono">{(fineTuning.accuracy * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={startFineTuning}
                disabled={isTraining}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isTraining ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Training...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Fine-Tuning Demo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Datasets & Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Training Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  MathQA (37K problems)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  GSM8K (8.5K problems)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Competition Math (12.5K)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  AMC/AIME/USAMO/IMO
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-pink-500" />
                Reasoning Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Chain-of-Thought Prompting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Multi-Step Verification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Alternative Approaches
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Configurable Reasoning Levels
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GitBranch className="h-5 w-5 text-orange-500" />
                Deployment Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Single H100 GPU
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Docker + NVIDIA Runtime
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Kubernetes Scaling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Apache 2.0 License
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
