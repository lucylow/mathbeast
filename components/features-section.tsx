import { Brain, Network, Gamepad2, Users, Video, Smartphone } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning Engine",
    description:
      "Our AI continuously adjusts problem difficulty based on your performance, ensuring you're always challenged but never overwhelmed.",
  },
  {
    icon: Network,
    title: "Knowledge Gap Detection",
    description:
      "MathBeast identifies specific concepts you're struggling with and provides targeted practice to fill those gaps.",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description:
      "Earn points, badges, and climb leaderboards as you master concepts. Turn learning into an engaging game.",
  },
  {
    icon: Users,
    title: "Collaborative Challenges",
    description:
      "Compete with friends or join study groups to solve problems together in real-time collaborative sessions.",
  },
  {
    icon: Video,
    title: "Step-by-Step Video Solutions",
    description:
      "Access detailed video explanations for every problem, with multiple approaches to suit different learning styles.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Learn anywhere, anytime with our fully responsive platform that works seamlessly on all devices.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Powerful Features for Math Mastery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MathBeast combines cutting-edge AI with proven learning science to deliver unprecedented results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
