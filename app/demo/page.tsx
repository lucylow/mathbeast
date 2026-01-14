import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DemoSection } from "@/components/demo-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, BookOpen, Brain } from "lucide-react"

export const metadata = {
  title: "Interactive Demo | MathBeast",
  description: "Try our AI-powered math tutor with interactive problem-solving and step-by-step explanations.",
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Play className="h-4 w-4" />
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 text-balance">
              Experience AI-Powered Math Learning
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Try solving a quadratic equation with real-time AI assistance. Get hints, step-by-step solutions, and
              explanations tailored to your learning style.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/features">
                <Button variant="outline" size="lg" className="rounded-full gap-2 bg-transparent">
                  <BookOpen className="h-5 w-5" />
                  View Features
                </Button>
              </Link>
              <Link href="/gpt-oss">
                <Button variant="outline" size="lg" className="rounded-full gap-2 bg-transparent">
                  <Brain className="h-5 w-5" />
                  Learn About GPT-OSS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <DemoSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to Master Mathematics?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students improving their math skills with MathBeast's AI-powered adaptive learning
            platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="rounded-full gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                API Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
