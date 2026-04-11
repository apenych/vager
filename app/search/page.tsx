'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import productsData from '@/data/products.json'

interface Product {
  id: number
  article: string
  brand: string
  name: string
  price: number
  quantity: number
  category: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const tab = searchParams.get('tab') || 'article'
  const brandFilter = searchParams.get('brand') || ''
  const modelFilter = searchParams.get('model') || ''
  
  const products = productsData as Product[]
  
  let results: Product[] = [...products]
  
  // Фильтр по запросу
  if (query) {
    const searchQuery = query.toLowerCase()
    if (tab === 'article') {
      results = results.filter(p => p.article.toLowerCase().includes(searchQuery))
    } else {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery)
      )
    }
  }
  
  // Фильтр по марке/модели VAG (ищем упоминание в названии)
  if (brandFilter) {
    const brandMap: { [key: string]: string[] } = {
      'volkswagen': ['vw', 'volkswagen', 'wv'],
      'audi': ['audi'],
      'skoda': ['skoda', 'шкода'],
      'seat': ['seat'],
      'porsche': ['porsche', 'каен', 'панамера']
    }
    const keywords = brandMap[brandFilter] || []
    results = results.filter(p => {
      const nameLower = p.name.toLowerCase()
      return keywords.some(kw => nameLower.includes(kw))
    })
  }
  
  if (modelFilter) {
    results = results.filter(p => 
      p.name.toLowerCase().includes(modelFilter.toLowerCase())
    )
  }

  return (
    <>
      <div style={styles.header}>
        <h1 style={styles.title}>Результаты поиска</h1>
        
        {(query || brandFilter) && (
          <div style={styles.filters}>
            {query && (
              <span style={styles.filterTag}>
                Запрос: "{query}" {tab === 'article' ? '(по артикулу)' : '(по названию)'}
              </span>
            )}
            {brandFilter && (
              <span style={styles.filterTag}>
                Марка: {brandFilter.charAt(0).toUpperCase() + brandFilter.slice(1)}
              </span>
            )}
            {modelFilter && (
              <span style={styles.filterTag}>
                Модель: {modelFilter}
              </span>
            )}
          </div>
        )}
        
        <p style={styles.resultsCount}>
          Найдено: {results.length} товаров
        </p>
      </div>

      {results.length === 0 ? (
        <div style={styles.noResults}>
          <span style={styles.noResultsIcon}>🔍</span>
          <p style={styles.noResultsText}>Ничего не найдено</p>
          <p style={styles.noResultsHint}>Попробуйте изменить запрос или выберите другую категорию</p>
          <Link href="/catalog" style={styles.catalogLink}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div style={styles.productsGrid}>
          {results.slice(0, 100).map((product) => (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id}
              style={styles.productLink}
            >
              <div style={styles.productCard}>
                <div style={styles.productHeader}>
                  <span style={styles.article}>{product.article}</span>
                </div>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productFooter}>
                  <span style={styles.price}>
                    {product.price.toLocaleString()} ₸
                  </span>
                  {product.brand && (
                    <span style={styles.brand}>{product.brand}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {results.length > 100 && (
        <p style={styles.showingMore}>
          Показано первые 100 из {results.length} результатов
        </p>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <main suppressHydrationWarning>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      <section style={styles.section}>
        <div style={styles.container}>
          <Suspense fallback={<p style={styles.loading}>Загрузка...</p>}>
            <SearchResults />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  section: { padding: '50px 0', minHeight: '60vh' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  loading: { textAlign: 'center', padding: '50px 0', fontSize: '18px', color: '#999' },
  header: { marginBottom: '30px' },
  title: { fontSize: '32px', marginBottom: '10px', color: '#1a1a1a' },
  filters: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' },
  filterTag: { fontSize: '14px', backgroundColor: '#f0f0f0', padding: '6px 12px', borderRadius: '20px', color: '#333' },
  resultsCount: { fontSize: '16px', color: '#ff6600', fontWeight: 'bold' },
  noResults: { textAlign: 'center', padding: '80px 0' },
  noResultsIcon: { fontSize: '80px', display: 'block', marginBottom: '20px' },
  noResultsText: { fontSize: '24px', color: '#999', marginBottom: '10px' },
  noResultsHint: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  catalogLink: { display: 'inline-block', padding: '15px 30px', backgroundColor: '#ff6600', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' },
  productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  productLink: { textDecoration: 'none', color: 'inherit' },
  productCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s' },
  productHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  article: { fontSize: '13px', color: '#999', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' },
  productName: { fontSize: '14px', marginBottom: '15px', color: '#333', minHeight: '60px', lineHeight: '1.5' },
  productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #eee' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#ff6600' },
  brand: { fontSize: '13px', color: '#666', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' },
  showingMore: { textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#999' },
}
