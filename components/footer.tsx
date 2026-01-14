import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-extrabold mb-5">MathBeast</h3>
            <p className="text-secondary-foreground/80 mb-5 leading-relaxed">
              Revolutionizing math education through AI-powered adaptive learning. Unleash your mathematical potential
              today.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Download App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Math Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Study Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Video Library
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Teacher Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
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
