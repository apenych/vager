'use client'

import { useCart } from '@/context/CartContext'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function HeaderContent() {
  const { totalItems } = useCart()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isHome = pathname === '/'
  const burgerOpen = searchParams.get('menu') === 'open'

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
    <>
      {/* ===== ДЕСКТОП ===== */}
      <header className="desktop-header">
        <div className="desktop-container">
          {/* Логотип */}
          <a href="/" className="desktop-logo-link">
            <div className="desktop-logo">
              <img src="/logo.png" alt="VAGER" className="desktop-logo-img" style={{ maxWidth: '100px', height: 'auto' }} />
            </div>
          </a>

          {/* Надпись Автоцентр */}
          <div className="desktop-brand-name">
            <span>Автоцентр</span>
          </div>

          {/* Адрес и время */}
          <div className="desktop-info-block">
            <div className="desktop-contact-item">
              <span className="contact-icon">📍</span>
              <span>ул. Рыскулова, 503, Шымкент</span>
            </div>
            <div className="desktop-contact-item">
              <span className="contact-icon">🕐</span>
              <span>Пн–Сб 9:00–19:00</span>
            </div>
          </div>

          {/* Телефоны */}
          <div className="desktop-phones-block">
            <a href="tel:+77089353782" className="desktop-phone">+7 708 935 37 82</a>
            <a href="tel:+77477371429" className="desktop-phone">+7 747 737 14 29</a>
          </div>

          {/* Корзина */}
          <div className="desktop-actions">
            <Link href="/cart" className="desktop-cart-btn">🛒 Корзина ({totalItems})</Link>
          </div>
        </div>
      </header>

      {/* ===== МОБИЛЬНЫЙ ===== */}
      <header className="mobile-header">
        <a href="/" className="mobile-logo-link">
          <img src="/logo.png" alt="VAGER" className="mobile-logo-img" />
        </a>
        <div className="mobile-brand-name">
          <span>Автоцентр</span>
        </div>
        <div className="mobile-cart-center">
          <Link href="/cart" className="mobile-cart-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            🛒 Корзина ({totalItems})
          </Link>
        </div>
        <Link
          href={burgerOpen ? pathname : '?menu=open'}
          className={`mobile-burger-btn ${burgerOpen ? 'open' : ''}`}
          scroll={false}
        >
          <span className="mobile-burger-line" />
          <span className="mobile-burger-line" />
          <span className="mobile-burger-line" />
        </Link>
      </header>

      {/* Бургер-меню */}
      {burgerOpen && (
        <>
          <Link href={pathname} scroll={false} className="burger-overlay" />
          <div className="burger-menu">
            <ul className="burger-list">
              {navItems.map((item, i) => (
                <li key={i} className="burger-item">
                  <Link href={item.href} className="burger-link" scroll={true}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="burger-divider" />
              <li className="burger-contact"><span>📍</span><span>ул. Рыскулова, 503, Шымкент</span></li>
              <li className="burger-contact"><span>📞</span><a href="tel:+77089353782" className="burger-phone">+7 708 935 37 82</a></li>
              <li className="burger-contact"><span>📞</span><a href="tel:+77477371429" className="burger-phone">+7 747 737 14 29</a></li>
              <li className="burger-contact"><span>🕐</span><span>Пн–Сб 9:00–19:00</span></li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  )
}
