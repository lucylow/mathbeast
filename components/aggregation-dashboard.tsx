"use client"

import { useState } from "react"
import { Database, RefreshCw, CheckCircle, Tag, FileText, Trophy, Video, Users } from "lucide-react"

const mathProblems = [
  {
    id: 1,
    title: "Quadratic Equation",
    content: "Solve for x: x² - 5x + 6 = 0",
    source: "Khan Academy",
    topic: "algebra",
    difficulty: "beginner",
    solutions: 3,
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    title: "Calculus Limit",
    content: "Evaluate lim(x→0) sin(x)/x",
    source: "MIT OpenCourseWare",
    topic: "calculus",
    difficulty: "intermediate",
    solutions: 5,
    timestamp: "15 minutes ago",
  },
  {
    id: 3,
    title: "Geometry Proof",
    content: "Prove that the sum of angles in a triangle is 180 degrees",
    source: "Art of Problem Solving",
    topic: "geometry",
    difficulty: "beginner",
    solutions: 2,
    timestamp: "30 minutes ago",
  },
  {
    id: 4,
    title: "Probability Problem",
    content: "What is the probability of rolling a sum of 7 with two dice?",
    source: "Brilliant.org",
    topic: "stats",
    difficulty: "beginner",
    solutions: 4,
    timestamp: "45 minutes ago",
  },
  {
    id: 5,
    title: "Linear Algebra",
    content: "Find the determinant of the matrix [[1, 2], [3, 4]]",
    source: "Wolfram MathWorld",
    topic: "algebra",
    difficulty: "intermediate",
    solutions: 3,
    timestamp: "1 hour ago",
  },
]

const filters = ["all", "algebra", "calculus", "geometry", "stats"]

const stats = [
  { icon: Database, label: "Total Problems", value: "124,587" },
  { icon: RefreshCw, label: "Last 24 Hours", value: "2,418" },
  { icon: CheckCircle, label: "Structured", value: "98.7%" },
  { icon: Tag, label: "Topics Covered", value: "47" },
]

const resourceTypes = [
  { icon: FileText, label: "Textbook Problems", count: "15,842 structured" },
  { icon: Trophy, label: "Competition Problems", count: "8,756 structured" },
  { icon: Video, label: "Video Solutions", count: "3,241 linked" },
  { icon: Users, label: "Community Solutions", count: "42,189 verified" },
]

export function AggregationDashboard() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProblem, setSelectedProblem] = useState(mathProblems[0].id)

  const filteredProblems = activeFilter === "all" ? mathProblems : mathProblems.filter((p) => p.topic === activeFilter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-500"
      case "intermediate":
        return "bg-amber-500"
      case "advanced":
        return "bg-rose-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-muted/30 rounded-t-[2rem]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Live Aggregation Dashboard</h2>
              <p className="text-muted-foreground">Real-time monitoring of data collection and structuring</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:bg-muted"
                }`}
              >
                {filter === "all" ? "All Topics" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Recently Aggregated Problems</h3>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Updated just now</span>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem.id)}
                  className={`p-6 border-b border-border cursor-pointer transition-colors ${
                    selectedProblem === problem.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {problem.topic}
                    </span>
                    <span
                      className={`px-3 py-1 ${getDifficultyColor(problem.difficulty)} text-white rounded-full text-xs font-medium`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Database className="w-3 h-3" /> {problem.source}
                    </span>
                  </div>

                  <p className="text-foreground mb-3">{problem.content}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> {problem.solutions} solutions
                      </span>
                      <span>{problem.timestamp}</span>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Structured</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="font-semibold mb-4 text-foreground">Aggregation Stats</h3>
              <div className="space-y-4">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="flex justify-between items-center py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="w-4 h-4" />
                        <span>{stat.label}</span>
                      </div>
                      <span className="font-bold text-foreground">{stat.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="font-semibold mb-4 text-foreground">Resource Types</h3>
              <div className="space-y-3">
                {resourceTypes.map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.label}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{resource.label}</div>
                        <div className="text-sm text-muted-foreground">{resource.count}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
