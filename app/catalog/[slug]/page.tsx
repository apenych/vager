import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const categories = categoriesData as any[]
  const products = productsData as any[]

  const category = categories.find(c => c.slug === slug)

  if (!category) {
    return (
      <main>
        <div className="sticky-top-bar">
          <Header />
          <Navigation />
        </div>
        <section style={styles.notFound}>
          <div style={styles.container}>
            <h1>Категория не найдена</h1>
            <p style={styles.debugInfo}>Искомый slug: <strong>{slug}</strong></p>
            <p style={styles.debugInfo}>Доступные категории ({categories.length}):</p>
            <div style={styles.debugSlugs}>
              {categories.map((c: any) => (
                <div key={c.slug}>
                  <span style={styles.debugSlug}>{c.slug}</span> — {c.name}
                </div>
              ))}
            </div>
            <Link href="/catalog" style={styles.backLink}>← Вернуться в каталог</Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const categoryProducts = products.filter(p => p.category === category.id)

  return (
    <main>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.breadcrumbs}>
            <Link href="/" style={styles.breadcrumbLink}>Главная</Link>
            <span style={styles.breadcrumbSep}> / </span>
            <Link href="/catalog" style={styles.breadcrumbLink}>Каталог</Link>
            <span style={styles.breadcrumbSep}> / </span>
            <span style={styles.breadcrumbCurrent}>{category.name}</span>
          </div>

          <h1 style={styles.title}>{category.name}</h1>
          <p style={styles.subtitle}>
            {categoryProducts.length} товаров
          </p>

          <div style={styles.productsGrid}>
            {categoryProducts.map((product: any) => (
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
        </div>
      </section>

      <Footer />
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  section: { padding: '50px 0', minHeight: '60vh' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  breadcrumbs: { marginBottom: '20px', fontSize: '14px', color: '#666' },
  breadcrumbLink: { color: '#ff6600', textDecoration: 'none' },
  breadcrumbSep: { margin: '0 5px' },
  breadcrumbCurrent: { color: '#999' },
  title: { fontSize: '28px', marginBottom: '10px', color: '#1a1a1a' },
  subtitle: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  productLink: { textDecoration: 'none', color: 'inherit' },
  productCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #eee' },
  productHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  article: { fontSize: '13px', color: '#999', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' },
  productName: { fontSize: '14px', marginBottom: '15px', color: '#333', minHeight: '60px', lineHeight: '1.5' },
  productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #eee' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#ff6600' },
  brand: { fontSize: '13px', color: '#666', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' },
  notFound: { padding: '50px 0', textAlign: 'center' },
  debugInfo: { fontSize: '14px', color: '#666', marginTop: '10px' },
  debugSlugs: { textAlign: 'left', maxWidth: '600px', margin: '20px auto', fontSize: '13px' },
  debugSlug: { display: 'inline-block', backgroundColor: '#f5f5f5', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace', marginRight: '10px' },
  backLink: { display: 'inline-block', marginTop: '20px', color: '#ff6600', textDecoration: 'none', fontSize: '16px' },
}
