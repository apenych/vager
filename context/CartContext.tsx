'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  article: string
  brand: string
  price: number
  quantity: number
  cartQuantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'cartQuantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Загружаем корзину из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse cart:', e)
      }
    }
    setIsInitialized(true)
  }, [])

  // Сохраняем корзину в localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addToCart = (item: Omit<CartItem, 'cartQuantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, cartQuantity: i.cartQuantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, cartQuantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, cartQuantity: quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
