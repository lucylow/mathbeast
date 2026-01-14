import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PipelineSection } from "@/components/pipeline-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cpu, ArrowRight, Database, Code2 } from "lucide-react"

export const metadata = {
  title: "Processing Pipeline | MathBeast",
  description: "Explore the AI-powered data processing pipeline that structures and enriches math problems.",
}

export default function PipelinePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Cpu className="h-4 w-4" />
                AI Processing
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Processing Pipeline</h1>
              <p className="text-muted-foreground max-w-xl">
                Our 6-stage AI pipeline transforms raw math problems into structured, enriched content with solutions,
                hints, and difficulty assessments.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/data-sources">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Database className="h-4 w-4" />
                  Data Sources
                </Button>
              </Link>
              <Link href="/gpt-oss">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Code2 className="h-4 w-4" />
                  GPT-OSS-120B
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PipelineSection />

      {/* Performance Stats */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Pipeline Performance</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">100/min</div>
              <div className="text-muted-foreground">Problems Processed</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">{"<"}2s</div>
              <div className="text-muted-foreground">Avg Processing Time</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">95%+</div>
              <div className="text-muted-foreground">Solution Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">{"<"}10s</div>
              <div className="text-muted-foreground">Complex Problem Inference</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Learn About GPT-OSS-120B</h2>
          <p className="text-muted-foreground mb-6">
            Discover the AI model powering our advanced mathematical reasoning capabilities.
          </p>
          <Link href="/gpt-oss">
            <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
              Explore GPT-OSS-120B
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
