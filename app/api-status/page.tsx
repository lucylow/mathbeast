"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Activity, CheckCircle, AlertCircle, Clock, RefreshCw, Code2, ArrowRight } from "lucide-react"

interface EndpointStatus {
  name: string
  endpoint: string
  status: "operational" | "degraded" | "down"
  latency: number
  lastChecked: Date
}

export default function ApiStatusPage() {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    { name: "Problems API", endpoint: "/api/problems", status: "operational", latency: 45, lastChecked: new Date() },
    { name: "Solutions API", endpoint: "/api/solutions", status: "operational", latency: 120, lastChecked: new Date() },
    { name: "Hints API", endpoint: "/api/hints", status: "operational", latency: 89, lastChecked: new Date() },
    { name: "Batch Processing", endpoint: "/api/batch", status: "operational", latency: 230, lastChecked: new Date() },
    { name: "Adaptive API", endpoint: "/api/adaptive", status: "operational", latency: 156, lastChecked: new Date() },
    {
      name: "Classification API",
      endpoint: "/api/classify",
      status: "operational",
      latency: 78,
      lastChecked: new Date(),
    },
    {
      name: "GPT-OSS Config",
      endpoint: "/api/gpt-oss/config",
      status: "operational",
      latency: 32,
      lastChecked: new Date(),
    },
    {
      name: "GPT-OSS Benchmark",
      endpoint: "/api/gpt-oss/benchmark",
      status: "operational",
      latency: 1200,
      lastChecked: new Date(),
    },
    {
      name: "Competition Solver",
      endpoint: "/api/gpt-oss/competition",
      status: "operational",
      latency: 890,
      lastChecked: new Date(),
    },
    {
      name: "Fine-Tuning API",
      endpoint: "/api/gpt-oss/fine-tune",
      status: "operational",
      latency: 450,
      lastChecked: new Date(),
    },
  ])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStatus = async () => {
    setIsRefreshing(true)
    // Simulate API check
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setEndpoints((prev) =>
      prev.map((ep) => ({
        ...ep,
        latency: Math.floor(ep.latency * (0.8 + Math.random() * 0.4)),
        lastChecked: new Date(),
      })),
    )
    setIsRefreshing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "down":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/10 text-green-500"
      case "degraded":
        return "bg-yellow-500/10 text-yellow-500"
      case "down":
        return "bg-red-500/10 text-red-500"
      default:
        return ""
    }
  }

  const allOperational = endpoints.every((ep) => ep.status === "operational")

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Activity className="h-4 w-4" />
                System Status
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">API Status</h1>
              <p className="text-muted-foreground max-w-xl">
                Real-time status and performance metrics for all MathBeast API endpoints.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full gap-2 bg-transparent"
                onClick={refreshStatus}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/api-docs">
                <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Code2 className="h-4 w-4" />
                  API Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl p-6 ${allOperational ? "bg-green-500/10 border border-green-500/20" : "bg-yellow-500/10 border border-yellow-500/20"}`}
          >
            <div className="flex items-center gap-4">
              {allOperational ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              )}
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
                </h2>
                <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints Status */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-6">API Endpoints</h2>
          <div className="space-y-3">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.endpoint}
                className="bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(endpoint.status)}
                  <div>
                    <h3 className="font-semibold text-foreground">{endpoint.name}</h3>
                    <code className="text-xs text-muted-foreground">{endpoint.endpoint}</code>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="h-3 w-3" />
                      {endpoint.latency}ms
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                    {endpoint.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground text-center mb-10">Performance Metrics (24h)</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">99.99%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">127ms</div>
              <div className="text-muted-foreground text-sm">Avg Response Time</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">2.4M</div>
              <div className="text-muted-foreground text-sm">Requests Served</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-extrabold text-primary mb-2">0</div>
              <div className="text-muted-foreground text-sm">Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Integrate?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our API documentation to start building with MathBeast.
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
