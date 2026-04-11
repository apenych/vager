import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import categoriesData from '@/data/categories.json'
import type { Metadata } from 'next'

interface Category {
  id: string
  name: string
  slug: string
  product_count: number
  quantity: number
}

export const metadata: Metadata = {
  title: 'Каталог автозапчастей — все категории | VAGER',
  description: 'Полный каталог автозапчастей VAGER: двигатели, подвеска, тормозная система, электрика, масла, фильтры и многое другое. Более 11 000 товаров в наличии.',
  openGraph: {
    title: 'Каталог автозапчастей — все категории | VAGER',
    description: 'Полный каталог автозапчастей VAGER: двигатели, подвеска, тормозная система, электрика, масла, фильтры и многое другое.',
    type: 'website',
  },
}

export default function CatalogPage() {
  const categories = categoriesData as Category[]
  const regularCategories = categories.filter(
    c => c.product_count > 0 && !c.id.startsWith('2.')
  )
  const usedCategories = categories.filter(
    c => c.product_count > 0 && c.id.startsWith('2.')
  )

  return (
    <main>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      <section style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.title}>Каталог автозапчастей</h1>
          <p style={styles.subtitle}>
            Всего товаров: {categories.reduce((sum, c) => sum + c.product_count, 0).toLocaleString()}
          </p>

          <h2 style={styles.sectionTitle}>Запчасти</h2>
          <div style={styles.grid}>
            {regularCategories.map((category) => (
              <Link 
                href={`/catalog/${category.slug}`} 
                key={category.id}
                style={styles.cardLink}
              >
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>{category.name}</h3>
                  <p style={styles.cardCount}>{category.product_count} товаров</p>
                </div>
              </Link>
            ))}
          </div>

          {usedCategories.length > 0 && (
            <>
              <h2 style={styles.sectionTitle}>Б/У запчасти</h2>
              <div style={styles.grid}>
                {usedCategories.map((category) => (
                  <Link 
                    href={`/catalog/${category.slug}`} 
                    key={category.id}
                    style={styles.cardLink}
                  >
                    <div style={styles.card}>
                      <h3 style={styles.cardTitle}>{category.name}</h3>
                      <p style={styles.cardCount}>{category.product_count} товаров</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '50px 0',
    minHeight: '60vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '25px',
    color: '#1a1a1a',
    borderBottom: '2px solid #ff6600',
    paddingBottom: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '50px',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #eee',
  },
  cardTitle: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  cardCount: {
    fontSize: '14px',
    color: '#ff6600',
    fontWeight: 'bold',
  },
}
