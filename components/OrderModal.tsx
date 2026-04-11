'use client'

import { useState } from 'react'

interface OrderItem {
  name: string
  article: string
  price: number
  cartQuantity: number
}

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  items: OrderItem[]
  total: number
  source?: string
}

export default function OrderModal({ isOpen, onClose, items, total, source = 'Сайт' }: OrderModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone.trim()) {
      setError('Укажите номер телефона')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, city, items, total, source }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setName('')
        setPhone('')
        setCity('')
      } else {
        setError('Ошибка отправки. Попробуйте ещё раз.')
      }
    } catch {
      setError('Ошибка сети. Проверьте подключение к интернету.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setSuccess(false)
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="order-overlay" onClick={handleClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="order-close-btn"
          onClick={(e) => { e.preventDefault(); handleClose(); }}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ✕
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>✅</span>
            <h2 className="order-title">Заказ оформлен!</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Мы свяжемся с вами в ближайшее время для подтверждения заказа.
            </p>
            <button
              className="order-success-close-btn"
              onClick={(e) => { e.preventDefault(); handleClose(); }}
              style={{ padding: '14px 40px', backgroundColor: '#ff6600', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block' }}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2 className="order-title">Оформление заказа</h2>

            {items.length > 0 && (
              <div className="order-summary">
                <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Ваш заказ:</h3>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: '14px', color: '#333' }}>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <span style={{ color: '#999', margin: '0 15px' }}>× {item.cartQuantity}</span>
                    <span style={{ fontWeight: 'bold', color: '#ff6600' }}>{(item.price * item.cartQuantity).toLocaleString()} ₸</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd', fontSize: '16px', fontWeight: 'bold' }}>
                  <span>Итого:</span>
                  <span style={{ color: '#ff6600', fontSize: '18px' }}>{total.toLocaleString()} ₸</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: '500' }}>Имя</label>
                <input className="order-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" disabled={loading} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: '500' }}>Телефон <span style={{ color: '#f44336' }}>*</span></label>
                <input className="order-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" required disabled={loading} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: '500' }}>Город</label>
                <input className="order-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ваш город" disabled={loading} />
              </div>

              {error && <p style={{ color: '#f44336', fontSize: '14px', marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '6px' }}>{error}</p>}

              <button
                type="submit"
                className="order-submit-btn"
                disabled={loading}
                style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer' }}
              >
                {loading ? 'Отправка...' : '📩 Отправить заказ'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
