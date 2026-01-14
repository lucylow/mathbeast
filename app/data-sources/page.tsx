import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DataSourcesSection } from "@/components/data-sources-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Database, ArrowRight, LayoutDashboard, Cpu } from "lucide-react"

export const metadata = {
  title: "Data Sources | MathBeast",
  description: "Explore the 50+ data sources that power MathBeast's comprehensive math problem database.",
}

export default function DataSourcesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Database className="h-4 w-4" />
                Data Aggregation
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Data Sources</h1>
              <p className="text-muted-foreground max-w-xl">
                We aggregate math problems from 50+ trusted educational sources, including Khan Academy, Art of Problem
                Solving, MIT OpenCourseWare, and more.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/pipeline">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Cpu className="h-4 w-4" />
                  Pipeline
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DataSourcesSection />

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Data Sources</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">100K+</div>
              <div className="text-muted-foreground">Problems Aggregated</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Continuous Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">See the Processing Pipeline</h2>
          <p className="text-muted-foreground mb-6">
            Learn how we transform raw problem data into structured, AI-ready content.
          </p>
          <Link href="/pipeline">
            <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
              View Pipeline
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
