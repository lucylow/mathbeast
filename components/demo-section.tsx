"use client"

import { useState } from "react"
import { Bot, Lightbulb, ArrowRight, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KnowledgeChart } from "@/components/knowledge-chart"

const problems = [
  {
    equation: "x² - 5x + 6 = 0",
    display: "x² − 5x + 6 = 0",
    solution: ["x=2,3", "x=2, 3", "x = 2,3", "x = 2, 3", "2,3", "2, 3", "x=3,2", "x=3, 2"],
    hints: [
      "To factor a quadratic of the form ax² + bx + c = 0, look for two numbers that multiply to a·c and add to b.",
      "For x² - 5x + 6 = 0, we need two numbers that multiply to 6 and add to -5.",
      "The numbers -2 and -3 multiply to 6 and add to -5. So we can factor as (x-2)(x-3)=0.",
    ],
    steps: [
      "Start with the equation: x² - 5x + 6 = 0",
      "We need to factor the quadratic expression",
      "Find two numbers that multiply to 6 and add to -5",
      "The numbers -2 and -3 satisfy these conditions",
      "Rewrite the equation as (x - 2)(x - 3) = 0",
      "Apply the zero product property: if ab = 0, then a = 0 or b = 0",
      "Set each factor equal to zero: x - 2 = 0 or x - 3 = 0",
      "Solve each equation: x = 2 or x = 3",
      "The solution is x = 2, 3",
    ],
    finalAnswer: "x = 2, 3",
  },
  {
    equation: "2x² + 5x - 3 = 0",
    display: "2x² + 5x − 3 = 0",
    solution: ["x=0.5,-3", "x=0.5, -3", "x = 0.5,-3", "x = 0.5, -3", "x=1/2,-3", "x=1/2, -3", "x=-3,0.5", "x=-3, 1/2"],
    hints: [
      "First, identify a, b, and c in the quadratic equation ax² + bx + c = 0.",
      "For 2x² + 5x - 3 = 0, a=2, b=5, c=-3.",
      "We need two numbers that multiply to a·c = -6 and add to b = 5.",
    ],
    steps: [
      "Start with: 2x² + 5x - 3 = 0",
      "Multiply a·c: 2 × (-3) = -6",
      "Find two numbers that multiply to -6 and add to 5: 6 and -1",
      "Rewrite middle term: 2x² + 6x - x - 3 = 0",
      "Factor by grouping: 2x(x + 3) - 1(x + 3) = 0",
      "Factor out (x+3): (2x - 1)(x + 3) = 0",
      "Set each factor to zero: 2x - 1 = 0 or x + 3 = 0",
      "Solve: x = 1/2 or x = -3",
      "Solution: x = 0.5, -3",
    ],
    finalAnswer: "x = 0.5, -3",
  },
]

export function DemoSection() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [hintsGiven, setHintsGiven] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [progress, setProgress] = useState(10)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [knowledgeData, setKnowledgeData] = useState([65, 40, 75, 30, 50, 20])

  const problem = problems[currentProblem]

  const handleHint = () => {
    if (hintsGiven < problem.hints.length) {
      setHintsGiven((prev) => prev + 1)
      setProgress((prev) => Math.min(prev + 5, 100))
    }
  }

  const handleShowSolution = () => {
    setShowSolution(true)
    setProgress((prev) => Math.min(prev + 15, 100))
    setKnowledgeData((prev) => [
      Math.min(prev[0] + 15, 95),
      prev[1],
      prev[2],
      prev[3],
      prev[4],
      Math.min(prev[5] + 5, 80),
    ])
  }

  const handleCheckAnswer = () => {
    const answer = userAnswer.trim().toLowerCase().replace(/\s/g, "")
    const isCorrect = problem.solution.some((s) => s.replace(/\s/g, "").toLowerCase() === answer)

    if (isCorrect) {
      setFeedback("correct")
      setProgress((prev) => Math.min(prev + 20, 100))
      setKnowledgeData((prev) => [
        Math.min(prev[0] + 15, 95),
        prev[1],
        prev[2],
        prev[3],
        prev[4],
        Math.min(prev[5] + 5, 80),
      ])
    } else {
      setFeedback("incorrect")
      setProgress((prev) => Math.min(prev + 2, 100))
    }
  }

  const handleNextProblem = () => {
    setCurrentProblem((prev) => (prev + 1) % problems.length)
    setUserAnswer("")
    setHintsGiven(0)
    setShowSolution(false)
    setFeedback(null)
  }

  const isProblemSolved = feedback === "correct" || showSolution

  return (
    <section id="demo" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Experience MathBeast in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try our interactive demo to see how MathBeast adapts to your learning style and provides personalized
            guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 bg-card rounded-xl shadow-xl p-8">
          {/* Problem Side */}
          <div className="bg-muted rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Sample Problem</h3>
              <span className="bg-warning text-warning-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Intermediate Level
              </span>
            </div>

            <div className="mb-8">
              <p className="text-foreground mb-4">Solve the following quadratic equation by factoring:</p>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <span className="text-2xl font-mono text-foreground">{problem.display}</span>
              </div>
              <p className="text-foreground mt-4">Enter your solution in the box below:</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">Your Answer:</label>
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                placeholder="Enter your answer (e.g., x=2,3)"
                className={`h-12 text-lg ${
                  feedback === "correct"
                    ? "border-success bg-success/10"
                    : feedback === "incorrect"
                      ? "border-destructive bg-destructive/10"
                      : ""
                }`}
                disabled={isProblemSolved}
              />

              <div className="flex gap-3">
                {!isProblemSolved ? (
                  <>
                    <Button
                      onClick={handleHint}
                      variant="outline"
                      className="flex-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      disabled={hintsGiven >= problem.hints.length}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      {hintsGiven >= problem.hints.length ? "All Hints Given" : "Get Hint"}
                    </Button>
                    <Button
                      onClick={handleShowSolution}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Show Solution
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleNextProblem}
                    className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Next Problem
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-2">Your MathBeast Mastery Level</p>
              <div className="h-3 bg-border rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Algebra Basics</span>
                <span className="font-semibold text-primary">{progress}%</span>
                <span>Quadratic Expert</span>
              </div>
            </div>
          </div>

          {/* AI Sidebar */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Your MathBeast AI Tutor</h3>
            </div>

            <div className="flex-1 bg-muted rounded-xl p-6 border-l-4 border-primary mb-6">
              {feedback === "correct" ? (
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-warning mb-3">
                    <Star className="h-5 w-5" />
                    Correct Answer!
                  </h4>
                  <p className="text-foreground mb-2">Excellent work! You correctly solved the quadratic equation.</p>
                  <p className="text-foreground mb-4">The solution is indeed {problem.finalAnswer}.</p>
                  <p className="font-semibold text-success flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {"You've earned 20 MathBeast points!"}
                  </p>
                </div>
              ) : feedback === "incorrect" ? (
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-warning mb-3">
                    <Lightbulb className="h-5 w-5" />
                    Not Quite Right
                  </h4>
                  <p className="text-foreground mb-2">
                    {"Your answer is incorrect. Don't worry - let's work through it together."}
                  </p>
                  <p className="text-foreground">
                    {
                      'Try using the "Get Hint" button for guidance, or click "Show Solution" to see the complete step-by-step solution.'
                    }
                  </p>
                </div>
              ) : showSolution ? (
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-primary mb-3">
                    <Bot className="h-5 w-5" />
                    Complete Solution
                  </h4>
                  <p className="text-foreground mb-4">
                    {"Here's the step-by-step solution to the quadratic equation:"}
                  </p>
                  <ol className="space-y-2 mb-4">
                    {problem.steps.map((step, i) => (
                      <li key={i} className="text-sm text-foreground">
                        {i + 1}. {step}
                      </li>
                    ))}
                  </ol>
                  <p className="font-semibold text-success flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    The solution is {problem.finalAnswer}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-foreground mb-4">
                    {
                      "Hello! I'm your AI math tutor. I'll guide you through solving this quadratic equation. Try solving it first, and if you need help, click the \"Get Hint\" button."
                    }
                  </p>

                  {hintsGiven > 0 && (
                    <div className="space-y-4">
                      {problem.hints.slice(0, hintsGiven).map((hint, i) => (
                        <div key={i}>
                          <h4 className="font-bold text-primary mb-2">Hint #{i + 1}: Factoring Quadratics</h4>
                          <p className="text-sm text-foreground">{hint}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-4">Your Knowledge Map</h4>
              <KnowledgeChart data={knowledgeData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
