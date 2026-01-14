import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GPTOSSSection } from "@/components/gpt-oss-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, ArrowRight, Code2, Cpu, Sparkles } from "lucide-react"

export const metadata = {
  title: "GPT-OSS-120B | MathBeast",
  description:
    "Learn about GPT-OSS-120B, the 120B parameter Mixture-of-Experts model powering MathBeast's AI capabilities.",
}

const features = [
  {
    icon: Brain,
    title: "120B Parameters",
    description: "Mixture-of-Experts architecture with 120B total parameters, activating only 5.1B per pass.",
  },
  {
    icon: Sparkles,
    title: "Chain-of-Thought",
    description: "Advanced reasoning capabilities with configurable depth for mathematical proofs.",
  },
  {
    icon: Cpu,
    title: "Efficient Inference",
    description: "Runs on a single H100 GPU with MXFP4 quantization for cost-effective deployment.",
  },
  {
    icon: Code2,
    title: "Apache 2.0 License",
    description: "Fully open-weight model with permissive licensing for commercial use.",
  },
]

export default function GPTOSSPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              AI Model
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 text-balance">GPT-OSS-120B</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The open-weight Mixture-of-Experts model powering MathBeast's advanced mathematical reasoning. 120B
              parameters, optimized for STEM problem-solving and chain-of-thought reasoning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
                  Try It Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Code2 className="h-5 w-5" />
                  API Access
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GPTOSSSection />

      {/* Performance Comparison */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Benchmark Performance</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">92.3%</div>
              <div className="text-muted-foreground text-sm">MATH Benchmark</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">94.1%</div>
              <div className="text-muted-foreground text-sm">GSM8K</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">78.5%</div>
              <div className="text-muted-foreground text-sm">Competition Math</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">5.1B</div>
              <div className="text-muted-foreground text-sm">Active Parameters</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Experience the Power of GPT-OSS-120B</h2>
          <p className="text-muted-foreground mb-6">
            Try our interactive demo to see the model's mathematical reasoning capabilities in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
                Launch Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pipeline">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                View Pipeline
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
