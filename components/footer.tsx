import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-extrabold mb-5">MathBeast</h3>
            <p className="text-secondary-foreground/80 mb-5 leading-relaxed max-w-sm">
              Revolutionizing math education through AI-powered adaptive learning. Unleash your mathematical potential
              today.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/gpt-oss"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  GPT-OSS-120B
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Developers</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/api-docs"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api-status"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  API Status
                </Link>
              </li>
              <li>
                <Link
                  href="/data-sources"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Data Sources
                </Link>
              </li>
              <li>
                <Link
                  href="/pipeline"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Pipeline
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-secondary-foreground/60">
            © 2026 MathBeast. All rights reserved. Created for the LavaPunk Hackathon.
          </p>
        </div>
      </div>
    </footer>
  )
}
