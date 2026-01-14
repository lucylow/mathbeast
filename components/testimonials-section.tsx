"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    text: "I went from failing calculus to getting an A in just one semester. MathBeast's personalized approach identified exactly what I was missing and helped me build confidence step by step.",
    author: "Sarah J., Engineering Student",
  },
  {
    text: "The AI tutor feels like having a personal math teacher available 24/7. It explains concepts in multiple ways until I truly understand them.",
    author: "David L., High School Senior",
  },
  {
    text: "As a visual learner, the interactive graphs and step-by-step visualizations made abstract concepts concrete for the first time in my math education.",
    author: "Mia R., Computer Science Major",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">What Students Are Saying</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have transformed their math skills with MathBeast.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-muted rounded-xl p-10 text-center relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0 p-10"
                }`}
              >
                <p className="text-xl italic text-foreground mb-6 leading-relaxed">{`"${testimonial.text}"`}</p>
                <p className="font-semibold text-primary">- {testimonial.author}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
