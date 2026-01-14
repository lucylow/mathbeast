import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AggregationDashboard } from "@/components/aggregation-dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, Database, Cpu, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Dashboard | MathBeast",
  description: "Access the MathBeast dashboard to manage problems, view analytics, and track your progress.",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <LayoutDashboard className="h-4 w-4" />
                Problem Dashboard
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Aggregation Dashboard</h1>
              <p className="text-muted-foreground max-w-xl">
                Browse, filter, and manage over 100,000+ math problems aggregated from 50+ sources.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/data-sources">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Database className="h-4 w-4" />
                  Data Sources
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

      <AggregationDashboard />

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Need API Access?</h2>
          <p className="text-muted-foreground mb-6">
            Integrate MathBeast's problem database into your own applications with our developer API.
          </p>
          <Link href="/api-docs">
            <Button size="lg" className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
              View API Documentation
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
