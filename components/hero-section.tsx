import { Brain, TrendingUp, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-muted to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Unleash Your Inner Math Beast
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              MathBeast is an AI-powered adaptive learning platform that personalizes math education for high school and
              university students. Our intelligent system identifies your weaknesses and builds customized learning
              paths to transform math anxiety into mathematical mastery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Try Free Demo
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
              >
                Watch Video Tour
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 mt-10 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10,000+</p>
                <p className="text-muted-foreground">Math Problems</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">94%</p>
                <p className="text-muted-foreground">Student Improvement</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-muted-foreground">AI Tutor Available</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative min-h-[400px] w-full">
            <div className="absolute top-0 right-0 lg:right-8 w-56 bg-card rounded-xl shadow-lg p-5 animate-float">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-accent" />
                <h4 className="font-bold text-foreground">AI Tutor</h4>
              </div>
              <p className="text-sm text-muted-foreground">Step-by-step guidance tailored to your learning style</p>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-52 bg-card rounded-xl shadow-lg p-5 animate-float-delayed-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <h4 className="font-bold text-foreground">Progress Tracker</h4>
              </div>
              <p className="text-sm text-muted-foreground">Visual analytics showing your improvement over time</p>
            </div>

            <div className="absolute bottom-0 right-0 w-60 bg-card rounded-xl shadow-lg p-5 animate-float-delayed-2">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-warning" />
                <h4 className="font-bold text-foreground">Gamified Learning</h4>
              </div>
              <p className="text-sm text-muted-foreground">Earn badges and compete on leaderboards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
