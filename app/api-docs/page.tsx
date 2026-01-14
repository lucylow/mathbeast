import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ApiSection } from "@/components/api-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code2, ArrowRight, Activity, Brain } from "lucide-react"

export const metadata = {
  title: "API Documentation | MathBeast",
  description: "Complete API documentation for integrating MathBeast's math problem database and AI solutions.",
}

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Code2 className="h-4 w-4" />
                Developer API
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">API Documentation</h1>
              <p className="text-muted-foreground max-w-xl">
                Integrate MathBeast's AI-powered math problem solving into your applications with our comprehensive REST
                API.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/api-status">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Activity className="h-4 w-4" />
                  API Status
                </Button>
              </Link>
              <Link href="/gpt-oss">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Brain className="h-4 w-4" />
                  GPT-OSS-120B
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ApiSection />

      {/* Quick Start */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Quick Start</h2>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Get Your API Key</h3>
                <p className="text-muted-foreground text-sm">Sign up for a free account to receive your API key.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Make Your First Request</h3>
                <pre className="bg-secondary text-secondary-foreground p-4 rounded-lg text-sm overflow-x-auto">
                  {`curl -X POST https://api.mathbeast.ai/v1/solve \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"problem": "Solve x^2 - 5x + 6 = 0"}'`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Get AI-Powered Solutions</h3>
                <p className="text-muted-foreground text-sm">
                  Receive step-by-step solutions with chain-of-thought reasoning, hints, and explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-6">
            Check the API status or explore the AI model behind our solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/api-status">
              <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
                Check API Status
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/gpt-oss">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                Learn About GPT-OSS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
