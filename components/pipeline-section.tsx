"use client"

import { CloudDownload, Code, GitBranch, Tags, CheckCheck, Server } from "lucide-react"

const pipelineSteps = [
  {
    id: 1,
    title: "Data Collection",
    description: "Continuous aggregation from 50+ sources",
    icon: CloudDownload,
  },
  {
    id: 2,
    title: "Content Parsing",
    description: "Extract problems, solutions, metadata",
    icon: Code,
  },
  {
    id: 3,
    title: "Structure Analysis",
    description: "Identify problem types and patterns",
    icon: GitBranch,
  },
  {
    id: 4,
    title: "Topic Classification",
    description: "Machine learning categorization",
    icon: Tags,
  },
  {
    id: 5,
    title: "Quality Validation",
    description: "Verify solutions and consistency",
    icon: CheckCheck,
  },
  {
    id: 6,
    title: "API Delivery",
    description: "Serve structured data via REST API",
    icon: Server,
  },
]

export function PipelineSection() {
  return (
    <section id="pipeline" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Intelligent Processing Pipeline</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            How MathBeast transforms raw data into structured learning resources
          </p>
        </div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
            {pipelineSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full font-medium">Active</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
