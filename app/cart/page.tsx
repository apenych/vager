'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import OrderModal from '@/components/OrderModal'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOrderSuccess = () => {
    clearCart()
    setShowOrderModal(false)
  }

  if (!mounted) {
    return (
      <main>
        <div className="sticky-top-bar">
          <Header />
          <Navigation />
        </div>
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
          <p>Загрузка корзины...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main>
        <div className="sticky-top-bar">
          <Header />
          <Navigation />
        </div>
        <section className="cart-empty-section">
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <h1 className="cart-title">Корзина</h1>
            <div className="cart-empty-cart">
              <span className="cart-empty-icon">🛒</span>
              <p className="cart-empty-text">Корзина пуста</p>
              <Link href="/catalog" className="cart-catalog-link">Перейти в каталог</Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      <section className="cart-section">
        <div className="cart-container">
          <div className="cart-header">
            <h1 className="cart-title">Корзина</h1>
            <a href="#" className="cart-clear-btn" onClick={(e) => { e.preventDefault(); clearCart(); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Очистить корзину</a>
          </div>

          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <Link href={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <span className="cart-item-article">Артикул: {item.article}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity-control">
                    <a href="#" className="cart-quantity-btn" onClick={(e) => { e.preventDefault(); updateQuantity(item.id, item.cartQuantity - 1); }} style={{ textDecoration: 'none' }}>-</a>
                    <span className="cart-quantity">{item.cartQuantity}</span>
                    <a href="#" className="cart-quantity-btn" onClick={(e) => { e.preventDefault(); updateQuantity(item.id, item.cartQuantity + 1); }} style={{ textDecoration: 'none' }}>+</a>
                  </div>

                  <span className="cart-item-price">{(item.price * item.cartQuantity).toLocaleString()} ₸</span>

                  <a href="#" className="cart-remove-btn" onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</a>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Товаров:</span>
              <span className="cart-summary-value">{totalItems} шт.</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">Итого:</span>
              <span className="cart-total-price">{totalPrice.toLocaleString()} ₸</span>
            </div>
            <a href="#" className="cart-checkout-btn" onClick={(e) => { e.preventDefault(); setShowOrderModal(true); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Оформить заказ
            </a>
          </div>
        </div>
      </section>

      <OrderModal
        isOpen={showOrderModal}
        onClose={handleOrderSuccess}
        items={items.map(item => ({
          name: item.name,
          article: item.article,
          price: item.price,
          cartQuantity: item.cartQuantity,
        }))}
        total={totalPrice}
      />

      <Footer />
    </main>
  )
}
