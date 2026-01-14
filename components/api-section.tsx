import { Code, Search, Bot, Lightbulb, Layers, Settings, Zap } from "lucide-react"

const apiEndpoints = [
  {
    icon: Code,
    title: "Problems API",
    description: "Access structured math problems with metadata, difficulty ratings, and competition levels",
    code: `GET /api/problems
?topic=algebra
&difficulty=intermediate
&limit=10`,
  },
  {
    icon: Search,
    title: "Classification API",
    description:
      "AI-powered problem classification with topic detection, difficulty assessment, and prerequisite mapping",
    code: `POST /api/classify
{
  "content": "Prove √2 is irrational",
  "source": "competition"
}`,
  },
  {
    icon: Bot,
    title: "Solution Generation",
    description: "Generate step-by-step solutions with chain-of-thought reasoning and verification",
    code: `POST /api/solutions
{
  "problemId": "abc123",
  "reasoningLevel": "high",
  "includeAlternatives": true
}`,
  },
  {
    icon: Lightbulb,
    title: "Hints API",
    description: "Progressive hint system with 3 levels - from subtle nudges to detailed guidance",
    code: `POST /api/hints
{
  "problemId": "abc123",
  "hintLevel": 2,
  "currentStep": 1
}`,
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Process up to 100 problems concurrently with job status tracking",
    code: `POST /api/batch
{
  "problems": [
    {"content": "...", "source": "..."}
  ]
}`,
  },
  {
    icon: Zap,
    title: "Adaptive Difficulty",
    description: "AI-driven difficulty recommendations based on student performance patterns",
    code: `POST /api/adaptive
{
  "userId": "user123",
  "recentPerformance": [...]
}`,
  },
]

export function ApiSection() {
  return (
    <section id="api" className="py-20 bg-slate-900 text-white rounded-[2rem] mx-4 lg:mx-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Developer API & Integration
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Access structured math data programmatically. Powered by GPT-OSS-120B inspired architecture with
            chain-of-thought reasoning and adaptive learning capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Chain-of-Thought", "Batch Processing", "Streaming", "Competition Math", "Adaptive Learning"].map(
              (cap) => (
                <span key={cap} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {cap}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiEndpoints.map((endpoint) => {
            const Icon = endpoint.icon
            return (
              <div
                key={endpoint.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  {endpoint.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{endpoint.description}</p>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-xs overflow-x-auto">
                  <code className="text-emerald-400 whitespace-pre">{endpoint.code}</code>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-white/5 rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold">Model Configuration</h3>
          </div>
          <p className="text-slate-400 mb-6">
            Get current model configuration, capabilities, and real-time processing statistics.
          </p>
          <div className="bg-black/40 rounded-xl p-5 font-mono text-sm overflow-x-auto">
            <code className="text-emerald-400 whitespace-pre">
              {`GET /api/config

Response:
{
  "model": {
    "modelId": "anthropic/claude-sonnet-4-20250514",
    "reasoningLevel": "medium",
    "useChainOfThought": true
  },
  "capabilities": {
    "maxBatchSize": 100,
    "reasoningLevels": ["low", "medium", "high"],
    "hintLevels": [1, 2, 3]
  },
  "stats": {
    "problemsProcessed": 15420,
    "solutionsGenerated": 8750,
    "cacheHits": 12300
  }
}`}
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
