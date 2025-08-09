"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, ShoppingCart, X, User } from 'lucide-react'
import { useCart } from './cart-context'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export default function Header() {
    const { state, toggleCart } = useCart()
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/cold-drinks', label: 'Cold Drinks' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Background Circle */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-purple-50 shadow-lg flex items-center justify-center border-2 border-purple-200 group-hover:scale-110 transition-all duration-300">
                <div className="text-lg font-black gradient-text">
                  <img src="/images/MR-logo.png" className = "rounded-full" alt="" />
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black gradient-text leading-none tracking-tight">
                𝗠𝗥 Foods
              </div>
              <div className="text-xs text-gray-500 font-medium tracking-widest">
                DELICIOUS • FRESH
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'border-b-2 pb-1'
                    : 'text-gray-700 hover:border-b-2 hover:border-opacity-50 pb-1'
                }`}
                style={{
                  color: isActive(link.href) ? '#CF9FFF' : undefined,
                  borderColor: isActive(link.href) ? '#CF9FFF' : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    (e.target as HTMLElement).style.color = '#CF9FFF';
                    (e.target as HTMLElement).style.borderColor = '#CF9FFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    const target = e.target as HTMLElement;
                    target.style.color = '#374151';
                    target.style.borderColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#CF9FFF]/10 transition-colors duration-300 p-2"
              style={{ width: '44px', height: '44px' }}
            >
              <User className="h-6 w-6 text-gray-700 hover:text-[#CF9FFF]" />
            </Button>
          </nav>

           <div className="flex items-center space-x-4">
             <Button
                variant="outline"
                size="icon"
                className="relative hover:bg-[#CF9FFF]"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-purple-100 pt-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  style={{
                    color: isActive(link.href) ? '#CF9FFF' : undefined,
                    backgroundColor: isActive(link.href) ? '#F8F0FE' : undefined,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
