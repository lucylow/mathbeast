"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-8 w-8 text-accent" />
            <span className="text-2xl font-extrabold text-primary">MathBeast</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="font-semibold text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#demo" className="font-semibold text-foreground hover:text-primary transition-colors">
              Demo
            </Link>
            <Link href="#testimonials" className="font-semibold text-foreground hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#about" className="font-semibold text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <Button className="hidden md:inline-flex bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-7 py-3 font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Start Learning Free
          </Button>

          <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="font-semibold text-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#demo" className="font-semibold text-foreground hover:text-primary transition-colors">
                Demo
              </Link>
              <Link href="#testimonials" className="font-semibold text-foreground hover:text-primary transition-colors">
                Testimonials
              </Link>
              <Link href="#about" className="font-semibold text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-7 py-3 font-semibold">
                Start Learning Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
