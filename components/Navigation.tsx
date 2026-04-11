'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [hovered, setHovered] = useState<number | null>(null)

  const navItems = isHome
    ? [
        { label: '🔧 Запчасти', href: '#catalog' },
        { label: '🛠️ Услуги', href: '#services' },
        { label: '🏢 О компании', href: '#about' },
      ]
    : [
        { label: '📦 Каталог запчастей', href: '/catalog' },
        { label: '🛠️ Услуги', href: '/#services' },
        { label: '🏢 О компании', href: '/#about' },
      ]

  return (
    <nav className="main-navigation">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <ul className="nav-menu">
          {navItems.map((item, i) =>
            isHome ? (
              <li key={i} style={{ position: 'relative' }}>
                <a
                  href={item.href}
                  className="nav-link"
                  style={hovered === i ? { backgroundColor: '#ff6600', color: '#fff' } : undefined}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={i} style={{ position: 'relative' }}>
                <Link
                  href={item.href}
                  className="nav-link"
                  style={hovered === i ? { backgroundColor: '#ff6600', color: '#fff' } : undefined}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  )
}
