'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import OrderModal from '@/components/OrderModal'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'

const SITE_URL = 'https://vager.kz'

interface Product {
  id: number
  article: string
  brand: string
  name: string
  price: number
  quantity: number
  category: string
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const { addToCart } = useCart()
  const [showQuickOrder, setShowQuickOrder] = useState(false)

  const addCartBtnRef = useRef<HTMLAnchorElement>(null)
  const quickOrderBtnRef = useRef<HTMLAnchorElement>(null)

  const products = productsData as Product[]
  const categories = categoriesData as Category[]

  const product = products.find(p => p.id === productId)
  const category = product ? categories.find(c => c.id === product.category) : null

  // JSON-LD для товара
  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `${product.name} — артикул ${product.article}${product.brand ? `, бренд ${product.brand}` : ''}. Цена: ${product.price.toLocaleString()} ₸`,
    image: `${SITE_URL}/logo.png`,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    sku: product.article,
    mpn: product.article,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: 'KZT',
      price: product.price,
      availability: product.quantity > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'VAGER',
      },
    },
  } : null

  useEffect(() => {
    if (!product) return

    const addBtn = addCartBtnRef.current
    const quickBtn = quickOrderBtnRef.current

    const handleAdd = (e: Event) => {
      e.preventDefault()
      addToCart({
        id: product.id,
        name: product.name,
        article: product.article,
        brand: product.brand,
        price: product.price,
        quantity: 1,
      })
    }

    const handleQuick = (e: Event) => {
      e.preventDefault()
      setShowQuickOrder(true)
    }

    if (addBtn) {
      addBtn.addEventListener('touchend', handleAdd, { passive: false })
      addBtn.addEventListener('click', handleAdd)
    }
    if (quickBtn) {
      quickBtn.addEventListener('touchend', handleQuick, { passive: false })
      quickBtn.addEventListener('click', handleQuick)
    }

    return () => {
      if (addBtn) {
        addBtn.removeEventListener('touchend', handleAdd)
        addBtn.removeEventListener('click', handleAdd)
      }
      if (quickBtn) {
        quickBtn.removeEventListener('touchend', handleQuick)
        quickBtn.removeEventListener('click', handleQuick)
      }
    }
  }, [product, addToCart])

  if (!product) {
    return (
      <main>
        <div className="sticky-top-bar">
          <Header />
          <Navigation />
        </div>
        <section className="product-not-found">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1>Товар не найден</h1>
            <Link href="/catalog" className="product-back-link">← Вернуться в каталог</Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main>
      {/* JSON-LD Schema.org для товара */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      <section className="product-section">
        <div className="product-container">
          <div className="breadcrumbs">
            <Link href="/" className="breadcrumb-link">Главная</Link>
            <span className="breadcrumb-sep"> / </span>
            <Link href="/catalog" className="breadcrumb-link">Каталог</Link>
            <span className="breadcrumb-sep"> / </span>
            {category && (
              <>
                <Link href={`/catalog/${category.slug}`} className="breadcrumb-link">{category.name}</Link>
                <span className="breadcrumb-sep"> / </span>
              </>
            )}
            <span className="breadcrumb-current">Товар #{product.id}</span>
          </div>

          <div className="product-page">
            <div className="product-info">
              <div className="product-meta">
                <span className="product-article">Артикул: {product.article}</span>
                {product.brand && <span className="product-brand">Бренд: {product.brand}</span>}
              </div>

              <h1 className="product-name">{product.name}</h1>

              <div className="product-price-block">
                <span className="product-price">{product.price.toLocaleString()} ₸</span>
              </div>

              <div className="product-buttons-row">
                <a
                  ref={addCartBtnRef}
                  href="#"
                  className="product-add-cart-btn"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}
                >
                  🛒 В корзину
                </a>
                <a
                  ref={quickOrderBtnRef}
                  href="#"
                  className="product-quick-order-btn"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}
                >
                  ⚡ Купить в 1 клик
                </a>
              </div>
            </div>
          </div>

          {similarProducts.length > 0 && (
            <div className="product-similar-section">
              <h2 className="product-similar-title">Похожие товары</h2>
              <div className="product-similar-grid">
                {similarProducts.map((p) => (
                  <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product-similar-card">
                      <span className="product-similar-article">{p.article}</span>
                      <h3 className="product-similar-name">{p.name}</h3>
                      <span className="product-similar-price">{p.price.toLocaleString()} ₸</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <OrderModal
        isOpen={showQuickOrder}
        onClose={() => setShowQuickOrder(false)}
        items={[{ name: product.name, article: product.article, price: product.price, cartQuantity: 1 }]}
        total={product.price}
        source="Быстрая покупка"
      />

      <Footer />
    </main>
  )
}
