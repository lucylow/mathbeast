import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Database, Code2, Brain, LayoutDashboard, Cpu } from "lucide-react"

const quickLinks = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Browse and filter 100K+ math problems",
    href: "/dashboard",
  },
  {
    icon: Database,
    title: "Data Sources",
    description: "Explore 50+ educational sources",
    href: "/data-sources",
  },
  {
    icon: Cpu,
    title: "Pipeline",
    description: "See our AI processing pipeline",
    href: "/pipeline",
  },
  {
    icon: Code2,
    title: "API Docs",
    description: "Integrate with our REST API",
    href: "/api-docs",
  },
  {
    icon: Brain,
    title: "GPT-OSS-120B",
    description: "Learn about our AI model",
    href: "/gpt-oss",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Quick Links Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Explore MathBeast</h2>
            <p className="text-muted-foreground">Discover all the features and tools available on our platform</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                <p className="text-muted-foreground text-sm">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />
      <FeaturesSection />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to Master Mathematics?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students improving their math skills with MathBeast's AI-powered adaptive learning
            platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" variant="secondary" className="rounded-full gap-2">
                Try the Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
