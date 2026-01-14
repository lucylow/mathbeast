"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Demo", href: "/demo" },
  { name: "Features", href: "/features" },
  {
    name: "Platform",
    href: "#",
    children: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Data Sources", href: "/data-sources" },
      { name: "Pipeline", href: "/pipeline" },
    ],
  },
  {
    name: "Developers",
    href: "#",
    children: [
      { name: "API Documentation", href: "/api-docs" },
      { name: "GPT-OSS-120B", href: "/gpt-oss" },
      { name: "API Status", href: "/api-status" },
    ],
  },
  { name: "About", href: "/about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-8 w-8 text-accent" />
            <span className="text-2xl font-extrabold text-primary">MathBeast</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-4 py-2 font-semibold text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link
                          href={child.href}
                          className={`w-full ${isActive(child.href) ? "text-primary font-semibold" : ""}`}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 font-semibold transition-colors rounded-lg hover:bg-muted ${
                    isActive(item.href) ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full px-6 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-6 font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden text-primary p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name} className="space-y-1">
                    <div className="px-4 py-2 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-6 py-2 font-medium transition-colors ${
                          isActive(child.href)
                            ? "text-primary bg-primary/10"
                            : "text-foreground hover:text-primary hover:bg-muted"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 font-semibold transition-colors ${
                      isActive(item.href) ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ),
              )}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
