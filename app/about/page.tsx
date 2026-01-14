import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Lightbulb, ArrowRight, Github, Twitter, Linkedin } from "lucide-react"

export const metadata = {
  title: "About | MathBeast",
  description: "Learn about MathBeast's mission to revolutionize math education through AI-powered adaptive learning.",
}

const team = [
  {
    name: "Lucy Low",
    role: "Founder & CEO",
    image: "/professional-woman-portrait.png",
  },
  {
    name: "Alex Chen",
    role: "CTO",
    image: "/professional-man-portrait-tech.png",
  },
  {
    name: "Maria Garcia",
    role: "Head of AI",
    image: "/professional-woman-scientist.png",
  },
  {
    name: "James Wilson",
    role: "Lead Engineer",
    image: "/professional-engineer.png",
  },
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe everyone deserves access to quality math education, regardless of background or location.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage cutting-edge AI to create learning experiences that adapt to each student's needs.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "We build in the open and collaborate with educators, students, and researchers worldwide.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 text-balance">
              Revolutionizing Math Education
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MathBeast was born from a simple belief: that AI can make high-quality math education accessible to
              everyone. We're building the future of learning, one problem at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're on a mission to democratize mathematics education by harnessing the power of artificial
                intelligence. MathBeast aggregates problems from over 50 educational sources and uses GPT-OSS-120B to
                provide personalized, step-by-step guidance to students worldwide.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Built for the LavaPunk Hackathon, MathBeast represents the cutting edge of AI-assisted education,
                combining advanced reasoning models with adaptive learning techniques.
              </p>
              <div className="flex gap-4">
                <Link href="/demo">
                  <Button className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary">
                    Try the Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" className="rounded-full bg-transparent">
                    View Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-2">100K+</div>
                  <div className="text-muted-foreground text-sm">Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground text-sm">Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-2">94%</div>
                  <div className="text-muted-foreground text-sm">Improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 border border-border text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted border-4 border-border group-hover:border-primary/50 transition-colors">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
                <div className="flex justify-center gap-3 mt-3">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Join the Math Revolution</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether you're a student looking to improve, an educator seeking resources, or a developer wanting to
            integrate our API, we'd love to have you on board.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" variant="secondary" className="rounded-full gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Developer API
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
