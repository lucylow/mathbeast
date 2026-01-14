"use client"

import { useState } from "react"
import { GraduationCap, Trophy, Building, Laptop, BookOpen, Lightbulb, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"

const dataSources = [
  {
    id: 1,
    name: "Khan Academy",
    type: "Educational Platform",
    icon: GraduationCap,
    problems: "15,000+",
    status: "active",
    lastUpdated: "2 hours ago",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Art of Problem Solving",
    type: "Competition Math",
    icon: Trophy,
    problems: "8,500+",
    status: "active",
    lastUpdated: "1 hour ago",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: 3,
    name: "MIT OpenCourseWare",
    type: "University Course",
    icon: Building,
    problems: "12,000+",
    status: "active",
    lastUpdated: "3 hours ago",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 4,
    name: "Project Euler",
    type: "Computational Math",
    icon: Laptop,
    problems: "700+",
    status: "active",
    lastUpdated: "4 hours ago",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    id: 5,
    name: "Wolfram MathWorld",
    type: "Reference Library",
    icon: BookOpen,
    problems: "25,000+",
    status: "active",
    lastUpdated: "5 hours ago",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    id: 6,
    name: "Brilliant.org",
    type: "Interactive Learning",
    icon: Lightbulb,
    problems: "5,000+",
    status: "syncing",
    lastUpdated: "10 minutes ago",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 7,
    name: "AoPS Forums",
    type: "Community Solutions",
    icon: Users,
    problems: "42,000+",
    status: "active",
    lastUpdated: "30 minutes ago",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    id: 8,
    name: "YouTube Math",
    type: "Video Solutions",
    icon: Video,
    problems: "3,200+",
    status: "processing",
    lastUpdated: "1 hour ago",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
]

export function DataSourcesSection() {
  const [selectedSource, setSelectedSource] = useState<(typeof dataSources)[0] | null>(null)

  return (
    <section id="sources" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Aggregated Data Sources</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            MathBeast continuously collects and structures mathematical content from diverse, high-quality sources
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataSources.map((source) => {
            const Icon = source.icon
            return (
              <div
                key={source.id}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500" />

                <div className={`w-14 h-14 rounded-xl ${source.bgColor} flex items-center justify-center mb-5`}>
                  <Icon className={`w-7 h-7 ${source.color}`} />
                </div>

                <h3 className="text-lg font-semibold mb-1 text-foreground">{source.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{source.type}</p>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{source.problems}</div>
                    <div className="text-xs text-muted-foreground">Problems</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-sm font-semibold ${
                        source.status === "active"
                          ? "text-emerald-500"
                          : source.status === "syncing"
                            ? "text-amber-500"
                            : "text-rose-500"
                      }`}
                    >
                      {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => setSelectedSource(source)}
                >
                  View Details
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <Dialog open={!!selectedSource} onOpenChange={() => setSelectedSource(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedSource?.name}</DialogTitle>
            <p className="text-muted-foreground">{selectedSource?.type}</p>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-primary/10 p-4 rounded-xl">
              <div className="text-sm font-medium text-primary mb-1">Problems Aggregated</div>
              <div className="text-2xl font-bold">{selectedSource?.problems}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-xl">
              <div className="text-sm font-medium text-primary mb-1">Update Frequency</div>
              <div className="text-2xl font-bold">Every 6 hours</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Data Structure</h4>
            <ul className="space-y-2 text-muted-foreground">
              {["Problems with metadata", "Step-by-step solutions", "Difficulty ratings", "Topic classification"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
