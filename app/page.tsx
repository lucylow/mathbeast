import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { DataSourcesSection } from "@/components/data-sources-section"
import { AggregationDashboard } from "@/components/aggregation-dashboard"
import { PipelineSection } from "@/components/pipeline-section"
import { ApiSection } from "@/components/api-section"
import { GPTOSSSection } from "@/components/gpt-oss-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <GPTOSSSection />
      <DataSourcesSection />
      <AggregationDashboard />
      <PipelineSection />
      <ApiSection />
      <DemoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
